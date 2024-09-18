import Image from "next/image";
import { auth } from "../../../auth";
import { Pill } from "@/components/landing/pill";
import ShinyButton from "@/components/magicui/shiny-button";
import Particles from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";
import SparklesText from "@/components/magicui/sparkles-text";
import { AnimatedBeamCustom } from "@/components/landing/AnimateBeamCustome";
import { GettingStartedSteps } from "@/components/landing/getttingStartedSteps";
import Meteors from "@/components/magicui/meteors";
import { FaqSection } from "@/components/landing/faqsection";
import { ImLogo } from "@/components/IMLogo";
import { BorderBeam } from "@/components/magicui/border-beam";

export default async function Home() {

  return (
    <div>
      <section id="hero" className="flex flex-col items-center">
        <Pill />
        <h1 className="w-2/3 text-[84px] mx-auto font-bold text-center leading-[0.90] tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">Revolutionize {" "}</span>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800">How You Access {" "}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">Information {" "}</span>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800">from {" "}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">Documents</span>
        </h1>
        <h3 className="text-[22px] font-medium mt-8">
          <span className="w-2/3 text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 mx-auto text-center block">
            Instantly Extract Key Insights from Your Documents with an Interactive PDF Chat
          </span>
        </h3>
        <div className="w-full flex justify-center z-10">
          <ShinyButton text="Get Started for free" className="mt-10 p-4 px-6" />
        </div>
        <Particles
          className="absolute inset-0"
          quantity={400}
          ease={80}
          color="FFA500"
          refresh
        />
      </section>
      <section id="Hero-image" className="flex justify-center mt-32 relative">
        <div className="relative w-[90%]">
          <div className="border mx-auto w-4/5 p-4 mt-4 rounded-md bg-zinc-100 backdrop-blur-md object-cover relative">
            <Image
              src={"/chatpage.png"}
              alt={"Image of the product"}
              width={1920}
              height={1080}
            />
            <BorderBeam colorFrom='#FFA500' colorTo='#FFFF00' size={250} duration={12} delay={9} />
          </div>
          <div className="absolute top-[-40px] -z-10 left-1/2 transform -translate-x-1/2 w-[100%] h-96 bg-gradient-to-b from-orange-300 to-transparent rounded-t-full blur-3xl opacity-50"></div>
          <div
            className="absolute bottom-0 left-0 w-full h-3/5 bg-gradient-to-t from-white via-white to-transparent"
          ></div>
        </div>
      </section>
      <section className="flex flex-col justify-center mt-12 px-32">
        <h1 className="font-bold text-[52px] w-[40%] text-zinc-800 mx-auto text-center leading-[0.90] tracking-tighter">
          Find and understand info from documents <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">milliseconds</span>
        </h1>
        <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 text-[18px] w-[50%] mx-auto text-center mt-4">
          Generate an AI assistant on top of any document or group of documents. Ask questions to quickly extract and summarize data.
        </h3>
        <div className="flex w-full gap-6 mt-10 mx-auto">
          <MagicCard
            className="cursor-pointer flex flex-col items-center justify-center shadow-2xl whitespace-nowrap p-6 pr-0 pb-0 text-2xl overflow-hidden relative"
            gradientColor={"#D9D9D955"}
          >
            <div className="flex gap-2 items-baseline justify-center font-bold">
              <span className="font-bold text-zinc-800 text-center">🫠 Tons of Reading</span>
            </div>
            <Image
              className="p-4 mt-4 rounded-md overflow-hidden bg-zinc-100 backdrop-blur-md pr-0 max-h-[500px]"
              src={"/chatpagehalfleft.png"}
              alt={"Image of the product"}
              width={1920}
              height={1080} />
          </MagicCard>
          <MagicCard
            className="cursor-pointer flex flex-col items-center justify-center shadow-2xl whitespace-nowrap p-6 pl-0 pb-0 text-xl overflow-hidden"
            gradientColor={"#D9D9D955"}
          >
            <div className="flex gap-2 items-baseline justify-center font-bold">
              <span className="font-bold text-zinc-600">🥱</span>
              <SparklesText
                text="IdealMate."
                className="text-[32px] "
              />
            </div>
            <Image
              className="p-4 pl-0 mt-4 rounded-md overflow-hidden bg-zinc-100 backdrop-blur-md max-h-[500px]"
              src={"/chatpagehalfright.png"}
              alt={"Image of the product"}
              width={1920}
              height={1080}
            />
          </MagicCard>
        </div>
      </section>
      <section className="relative flex flex-col justify-center mt-36  overflow-hidden">
        <h1 className="font-bold text-[52px] w-[40%] text-zinc-800 mx-auto text-center leading-[0.90] tracking-tighter">
          Harness the power of <span className="bg-clip-text text-transparent bg-gradient-to-r text-[80px] from-orange-500 via-orange-400 to-orange-300">AI</span>
        </h1>
        <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 text-[18px] w-[50%] mx-auto text-center mt-4">
          Top of the line AI models available at your fingertips
        </h3>
        <AnimatedBeamCustom />
      </section>
      <section className="relative flex flex-col justify-center mt-36 overflow-hidden">
        <h1 className="font-bold text-[52px] w-[40%] text-zinc-800 mx-auto text-center leading-[0.90] tracking-tighter">
          Get started in just <span className="bg-clip-text text-transparent bg-gradient-to-r  from-orange-500 via-orange-400 to-orange-300">3 Steps</span>
        </h1>
        <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 text-[18px] w-[50%] mx-auto text-center mt-4">
          A very simple onboarding process
        </h3>
        <GettingStartedSteps />
      </section>
      <section className="relative flex flex-col justify-center items-center mt-36 bg-black overflow-hidden py-24">
        <Meteors number={30} />
        <h1 className="font-bold text-[52px] w-[40%] text-zinc-100 mx-auto text-center leading-[0.90] tracking-tighter">
          Start your<span className="bg-clip-text text-transparent bg-gradient-to-r  from-orange-500 via-orange-400 to-orange-300">{" "} free trial {" "}</span>today.
        </h1>
        <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 text-[18px] w-[50%] mx-auto text-center mt-4">
          Upto 5 imports and 500 generations
        </h3>
        <ShinyButton text="Get Started for free" className="mt-10 p-4 px-6" />
      </section>
      <section id="faq" className="relative flex flex-col justify-center items-center mt-36 overflow-hidden p-12">
        <h1 className="font-bold text-[52px] w-[80%] text-zinc-800 mx-auto text-center leading-[1] tracking-tighter">
          Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r  from-orange-500 via-orange-400 to-orange-300">Questions</span>
        </h1>
        <FaqSection />
      </section>
      <section id="footer" className="relative flex flex-col justify-center items-center mt-36 overflow-hidden py-12">
        <div className="flex justify-center items-center gap-4">
          <ImLogo />
          <span className="text-zinc-800 font-bold text-2xl">IdealMate.</span>
        </div>
      </section>
    </div>
  )
}
