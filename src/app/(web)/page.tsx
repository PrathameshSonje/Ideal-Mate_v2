import Image from "next/image";
import { auth } from "../../../auth";
import { Pill } from "@/components/landing/pill";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/helpers/utils";
import ShinyButton from "@/components/magicui/shiny-button";
import Particles from "@/components/magicui/particles";
import WordFadeIn from "@/components/magicui/word-fade-in";
import BlurIn from "@/components/magicui/blur-in";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { MagicCard } from "@/components/magicui/magic-card";
import SparklesText from "@/components/magicui/sparkles-text";

export default async function Home() {

  const session = await auth();

  return (
    <div>
      <section id="hero" className="flex flex-col items-center">
        <Pill />
        <h1 className="w-2/3 text-[80px] mx-auto font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-center leading-[0.90] tracking-tighter">
          <span>Revolutionize {" "}</span>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800">How You Access {" "}</span>
          <span>Information {" "}</span>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800">from {" "}</span>
          <span>Documents</span>
        </h1>
        <h3 className="text-[22px] font-medium mt-8">
          <span className="w-2/3 text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 mx-auto text-center block">
            Instantly Extract Key Insights from Your Documents with an Interactive PDF Chat
          </span>
        </h3>
        <div className="w-full flex justify-center">
          <ShinyButton text="Get Started for free" className="mt-10" />
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
          <Image
            className="border mx-auto w-4/5 z-10 p-4 mt-4 rounded-md bg-zinc-100 backdrop-blur-md relative"
            src={"/chatpage.png"}
            alt={"Image of the product"}
            width={1920}
            height={1080}
          />
          <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[100%] h-96 bg-gradient-to-b from-orange-300 to-transparent rounded-t-full blur-3xl opacity-50"></div>
        </div>
      </section>
      <section className="flex flex-col justify-center mt-32 px-32">
        <h1 className="font-bold text-[52px] w-[40%] text-zinc-800 mx-auto text-center leading-[0.90] tracking-tighter">
          Find and understand info in documents in <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">milliseconds</span>
        </h1>
        <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 text-[18px] w-[50%] mx-auto text-center mt-4">
          Generate an AI assistant on top of any document or group of documents. Ask questions to quickly extract and summarize data.
        </h3>
        <div className="flex w-full gap-6 mt-10 mx-auto">
          <MagicCard
            className="cursor-pointer flex flex-col items-center justify-center shadow-2xl shadow-orange-100 whitespace-nowrap p-6 pr-0 pb-0 text-2xl overflow-hidden relative"
            gradientColor={"#D9D9D955"}
          >
            <div className="flex gap-2 items-baseline justify-center font-bold">
              <span className="font-bold text-zinc-800 text-center">🥱 Tons of Reading</span>
            </div>
            <Image
              className="p-4 mt-4 rounded-md overflow-hidden bg-zinc-100 backdrop-blur-md pr-0 max-h-[500px]"
              src={"/chatpagehalfleft.png"}
              alt={"Image of the product"}
              width={1920}
              height={1080} />
          </MagicCard>
          <MagicCard
            className="cursor-pointer flex flex-col items-center justify-center shadow-orange-100 shadow-2xl whitespace-nowrap p-6 pl-0 pb-0 text-xl overflow-hidden"
            gradientColor={"#D9D9D955"}
          >
            <div className="flex gap-2 items-baseline justify-center font-bold">
              <span className="font-bold text-zinc-600">With</span>
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
      <section className="flex justify-center mt-32">
        <h1 className="font-bold text-[52px] w-[40%] text-zinc-800 mx-auto text-center leading-[0.90] tracking-tighter">
          Find and understand info in documents in <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">milliseconds</span>
        </h1>
      </section>
    </div>
  )
}
