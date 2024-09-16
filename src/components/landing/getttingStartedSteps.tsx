'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
import { BorderBeam } from "../magicui/border-beam";
import ShineBorder from "../magicui/shine-border";
import AnimatedShinyText from "../magicui/animated-shiny-text";

const step = ["/register.png", "/import.png", "/chatpage.png"]

export const GettingStartedSteps = () => {
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getTextStyle = (stepIndex: number) => {
        return stepIndex === currentStep
          ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"
          : " ";
      };

    return (
        <div className="flex px-32 mt-32 gap-16 justify-center items-center">
            <div id="steps" className="flex flex-col w-1/3 gap-16">
                <div id="step_1">
                    <AnimatedShinyText>
                        <span className={`font-bold text-3xl ${getTextStyle(0)}`}>1. Sign up for a account</span>
                    </AnimatedShinyText>
                    <p className="font-semibold text-lg text-zinc-500">Signup for a account free or premium to access the application</p>
                </div>
                <div id="step_2">
                    <AnimatedShinyText>
                        <span className={`font-bold text-3xl ${getTextStyle(1)}`}>2. Upload Documents</span>
                    </AnimatedShinyText>
                    <p className="font-semibold text-lg text-zinc-500">start uploading documents. Supported documents formats are .pptx, .pdf, etc. You can also upload websites or pdfs directly using url</p>
                </div>
                <div id="step_3">
                    <AnimatedShinyText>
                        <span className={`font-bold text-3xl ${getTextStyle(2)}`}>3. Start asking Questions</span>
                    </AnimatedShinyText>
                    <p className="font-semibold text-lg text-zinc-500">After you upload documents, out AI starts analyzing them and just like that you can start chatting with your documents</p>
                </div>
            </div>
            <ShineBorder
                className="w-2/3 p-4 rounded-md overflow-hidden bg-zinc-100 backdrop-blur-md"
                color={["#FF7F50", "#FFA500", "#FFB347"]}
            >
                <div id="img" >
                    <Image
                        className=""
                        src={step[currentStep]}
                        alt={"Image of the product"}
                        width={1920}
                        height={1080}
                    />
                </div>
            </ShineBorder>
        </div>
    )
}