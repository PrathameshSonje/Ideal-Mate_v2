import { NextRequest } from "next/server";
import { auth } from "../../../../auth";
import { SendMessageValidator } from "@/lib/types/sendMessageValidator";
import prisma from "@/db/prismaClient";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { getPineconeClient } from "@/lib/others/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, streamToResponse } from 'ai'
import { StreamingResponse } from "@/lib/helpers/utils";

export const POST = async (request: NextRequest) => {
    //endpoint for asking a question to a PDF
    const body = await request.json();

    const session = await auth();
    if (!session?.user || !session.user.id)
        return new Response('Unauthorized', { status: 401 })

    const { id: userId } = session?.user;
    const { fileId, message } = SendMessageValidator.parse(body)

    const file = await prisma.file.findFirst({
        where: {
            id: fileId,
            userId: userId
        }
    })

    if (!file) return new Response('NOT FOUND', { status: 404 })

    await prisma.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId,
            fileId
        }
    })

    //1. embeddings model
    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //     apiKey: process.env.HF_TOKEN,
    //     model: 'dunzhang/stella_en_1.5B_v5',
    // });

    //2. vector store
    // const pinecone = await getPineconeClient()
    // const pineconeIndex = pinecone.Index('ideal-mate-v2')
    // const vectorStore = await PineconeStore.fromExistingIndex(
    //     embeddings,
    //     {
    //         pineconeIndex,
    //         namespace: fileId
    //     }
    // )

    //3. similarity search
    // const similaritySearchResults = await vectorStore.similaritySearch(
    //     message,
    //     8
    // )

    //4. previous messages
    const prevMessages = await prisma.message.findMany({
        where: {
            fileId,
        },
        orderBy: {
            createdAt: 'asc',
        },
        take: 6,
    })

    const formattedPrevMessages = prevMessages.map((msg) => ({
        role: msg.isUserMessage
            ? ('user' as const)
            : ('assistant' as const),
        content: msg.text,
    }))

    //5. query the llm model
    const hf = new HfInference(process.env.HF_TOKEN)

    //todo give this in the prompt
    /*
            CONTEXT:
        ${similaritySearchResults.map((r) => r.pageContent).join('\n\n')}
         */

    let answer;

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [{
                role: 'system',
                content:
                    'Use the following pieces of context (or previous conversaton if needed) to answer the users question in proper markdown. The output should not include any ```markdown``` code block tags.',
            }, {
                role: 'user',
                content: `If you don't know the answer or if the user provides some random input, just say that you don't know, don't try to make up an answer. The answer should about what is asked and do not give irrelevent information
    
            \n----------------\n
    
            PREVIOUS CONVERSATION:
                ${formattedPrevMessages.map((message) => {
                    if (message.role === 'user')
                        return `User: ${message.content}\n`
                    return `Assistant: ${message.content}\n`
                })}
    
            \n----------------\n
    
    
            USER INPUT: ${message}`,
            },],
            max_tokens: 500,
            temperature: 0.1,
            seed: 0,
        })
    
        answer = response.choices[0].message.content
        console.log(answer);
    
    
        //save the response later do it on stream completion
        await prisma.message.create({
            data: {
                text: answer!,
                isUserMessage: false,
                userId,
                fileId
            }
        })
    
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                generations: {
                    increment: 1,
                }
            },
        });
    
    } catch (error) {
        console.log(error);
    }

    //6. stream the response
    // const responseStream = HuggingFaceStream(response, {
    //     async onCompletion(completion) {
    //         await prisma.message.create({
    //             data: {
    //                 text: completion,
    //                 isUserMessage: false,
    //                 fileId,
    //                 userId,
    //             },
    //         })
    //     },
    // })

    return new Response(answer, {
        status: 200
    })
}