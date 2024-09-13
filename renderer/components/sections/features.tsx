import React from "react"

import { BrainCircuit, CalendarPlus, Edit2Icon } from "lucide-react"
import { IoText } from "react-icons/io5"
import { MdOutlineSpaceDashboard } from "react-icons/md"

import { HamburgerMenuIcon, InputIcon } from "@radix-ui/react-icons"

import { BentoCard, BentoGrid, ShinyText } from "../../ui"
import cn from "../../utils/cn"
import Feature1 from "../features/feature-1"

const features = [
  {
    Icon: BrainCircuit,
    name: "AI-Powered Project Insights",
    description:
      "Leverage AI to track and predict project milestones. Gain insights on task delays and resource allocation for optimal project management.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1",
    background: (
      <div className="absolute flex transform flex-col items-center justify-center p-5 opacity-60 transition-transform duration-200 [mask-image:linear-gradient(to_top,transparent_20%,#000_80%)] hover:scale-105">
        <h1 className="mr-auto text-xl font-semibold">AI-Powered Analysis</h1>
        <p className="text-muted-foreground text-sm">
          Use AI-driven analytics to forecast project timelines and identify bottlenecks before they occur.
        </p>
        <div className="mt-5 flex gap-2">
          <div className="flex h-[100px] w-[130px] flex-col items-center justify-center rounded-lg border-2 p-2">
            <BrainCircuit className="h-[20px] w-[20px]" />
            <h1 className="text-lg font-bold">Predictive Insights</h1>
          </div>
          <div className="flex h-[100px] w-[130px] flex-col items-center justify-center rounded-lg border-2 p-2">
            <IoText className="h-[20px] w-[20px]" />
            <h1 className="text-lg font-bold">Smart Recommendations</h1>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: MdOutlineSpaceDashboard,
    name: "Comprehensive Node Dashboard",
    description:
      "Monitor and visualize critical node metrics in real-time, including block details, transactions, peers, bandwidth usage, and resource consumption.",
    href: "/",
    cta: "Learn more",
    className: "col-span-2",
    background: (
      <div className="absolute w-full transform p-5 opacity-80 transition-transform duration-300 hover:scale-105">
        <Feature1 />
      </div>
    ),
  },
  {
    Icon: MdOutlineSpaceDashboard,
    name: "KPI Indicators & Dashboards",
    description: "Customizable dashboards with all industry-standard KPIs for better tracking and control.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <></>,
  },
]

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:mt-[100px]">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <ShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Cool product features</span>
        </ShinyText>
      </div>
      <p className="md:[w-800px] relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-3xl font-bold text-transparent sm:text-5xl md:text-6xl">
        Cutting-edge Features Designed to Boost Efficiency
      </p>
      <h1 className="sm:text-md mb-5 mt-[-10px] text-center text-xs font-semibold sm:mt-2 md:text-xl">
        Discover a Seamless Experience with Mint - Boosting Productivity, Efficiency, and Collaboration in Every Click.
      </h1>
      <BentoGrid className="grid-cols-3 p-5 lg:w-[1300px]">
        {features.map((feature, idx) => (
          <BentoCard
            key={idx}
            {...feature}
          />
        ))}
      </BentoGrid>
    </div>
  )
}

export default Features
