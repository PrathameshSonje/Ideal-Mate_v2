'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqData = [
    {
        question: "What is acme.ai?",
        answer: "acme.ai is a cutting-edge AI platform that empowers businesses to harness the power of artificial intelligence. Our suite of tools and services makes it easy to develop, deploy, and manage AI-powered applications, even without extensive technical expertise."
    },
    {
        question: "How can I get started with acme.ai?",
        answer: "Getting started with acme.ai is simple! Sign up for a free account on our website, explore our comprehensive documentation, and try out our interactive tutorials. You'll be building AI-powered applications in no time."
    },
    {
        question: "What types of AI models does acme.ai support?",
        answer: "acme.ai supports a wide range of AI models, including but not limited to natural language processing, computer vision, predictive analytics, and reinforcement learning. Our platform is designed to be flexible, allowing you to use pre-trained models or create custom ones tailored to your specific needs."
    },
    {
        question: "Is acme.ai suitable for beginners in AI development?",
        answer: "acme.ai is designed with both beginners and experts in mind. Our user-friendly interface, step-by-step guides, and extensive learning resources make it easy for newcomers to dive into AI development. At the same time, our advanced features cater to the needs of experienced data scientists and AI engineers."
    },
    {
        question: "What kind of support does acme.ai provide?",
        answer: "At acme.ai, we're committed to your success. We offer 24/7 technical support, regular webinars and workshops, a vibrant community forum, and detailed documentation. For enterprise clients, we also provide dedicated account managers and custom onboarding programs to ensure smooth integration and maximum value from our platform."
    }
]

export const FaqSection = () => {
        const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 space-y-4 mt-16">
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