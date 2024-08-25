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
    const embeddings = new HuggingFaceInferenceEmbeddings({
        apiKey: process.env.HF_TOKEN,
        model: 'dunzhang/stella_en_1.5B_v5',
    });

    //2. vector store
    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.Index('ideal-mate-v2')
    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
            pineconeIndex,
            namespace: fileId
        }
    )

    //3. similarity search
    const similaritySearchResults = await vectorStore.similaritySearch(
        message,
        8
    )

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

    const response = hf.chatCompletionStream({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [{
            role: 'system',
            content:
                'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
        }, {
            role: 'user',
            content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.

        \n----------------\n

        CONTEXT:
        ${similaritySearchResults.map((r) => r.pageContent).join('\n\n')}

        USER INPUT: ${message}`,
        },],
        max_tokens: 500,
        temperature: 0.1,
        seed: 0,
    })

    //6. stream the response
    const responseStream = HuggingFaceStream(response, {
        async onCompletion(completion) {
            await prisma.message.create({
                data: {
                    text: completion,
                    isUserMessage: false,
                    fileId,
                    userId,
                },
            })
        },
    })

    return new StreamingResponse(responseStream)
}