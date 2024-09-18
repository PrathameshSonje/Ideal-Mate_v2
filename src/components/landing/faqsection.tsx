'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqData = [
    {
        question: "What is IdealMate AI",
        answer: "IdealMate AI is an innovative tool that allows you to chat with your documents. Whether it's a PDF or a website, you can upload the document and ask questions to get concise, AI-generated answers based on the content. It’s a powerful way to quickly understand and extract insights from your documents."
    },
    {
        question: "How can I get started with IdealMate.ai?",
        answer: "Getting started is simple: sign up for a free IdealMate account, upload your PDFs or websites, and start asking questions to get AI-generated answers based on your document's content."
    },
    {
        question: "What types of documents can I upload to IdealMate?",
        answer: "Currently, IdealMate supports PDF files and websites. You can import these documents to chat with them and ask questions. In the future, we plan to support additional formats like PPTX and more."
    },
    {
        question: "Will I be able to access documents after hitting the upload or question limit?",
        answer: "Yes, even after reaching the document or question limit on the free plan, you will still have access to the previously uploaded documents and the questions you’ve already generated. However, you won’t be able to upload new documents or generate more questions unless you upgrade your plan."
    },
    {
        question: "What kind of support does IdealMate.ai provide?",
        answer: "IdealMate.ai provides support for importing PDFs and websites, with plans to add more formats like PPT in the future. If you encounter any bugs or want to request features, please fill out our feedback form, and I’ll get back to you within a few days."
    }
]

export const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="w-full lg:max-w-3xl mx-auto p-4 space-y-4 mt-16">
            {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out bg-white hover:bg-gray-50"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                            <motion.div
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                            </motion.div>
                        </div>
                    </button>
                    <AnimatePresence>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}