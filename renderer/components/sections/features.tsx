import React from "react"

import { BrainCircuit, CalendarPlus, Edit2Icon } from "lucide-react"
import { BiNotification } from "react-icons/bi"
import { IoText } from "react-icons/io5"
import { MdOutlineSpaceDashboard } from "react-icons/md"

import { HamburgerMenuIcon, InputIcon } from "@radix-ui/react-icons"

import { BentoCard, BentoGrid, ShinyText } from "../../ui"
import cn from "../../utils/cn"
import Feature1 from "../features/feature-1"
// import AiIntegration from "../features/ai_integration"
// import Integrations from "../features/integration"
// import AnimatedListDemo from "../features/notification"
// import PieChartComponent from "../features/PieChart"
// import Colabration from "../features/team-colobration"

const features = [
  {
    Icon: Edit2Icon,
    name: "Fully customisable incident reporting",
    description: "Get AI-driven recommendations to improve your processes and make data-backed decisions.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1",
    background: (
      <div className="absolute flex transform flex-col items-center justify-center p-5 opacity-60 transition-transform duration-200 [mask-image:linear-gradient(to_top,transparent_20%,#000_80%)] hover:scale-105">
        <h1 className="mr-auto text-xl font-semibold">Create A Field</h1>
        <p className="text-muted-foreground text-sm">
          Drag A field type to one of the sections on the to create a custom field for the issue type
        </p>
        <div className="mt-5 flex gap-2">
          <div className="flex h-[100px] w-[130px] flex-col items-center justify-center rounded-lg border-2 p-2">
            <IoText className="h-[20px] w-[20px]" />
            <h1 className="text-lg font-bold">Short Text</h1>
          </div>
          <div className="flex h-[100px] w-[130px] flex-col items-center justify-center rounded-lg border-2 p-2">
            <HamburgerMenuIcon className="h-[20px] w-[20px]" />
            <h1 className="text-lg font-bold">Paragraph</h1>
          </div>
          <div className="flex h-[100px] w-[130px] flex-col items-center justify-center rounded-lg border-2 p-2">
            <CalendarPlus className="h-[20px] w-[20px]" />
            <h1 className="text-lg font-bold">Date</h1>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: InputIcon,
    name: "Unparalleled team collaboration",
    description: "Collaborate right within issues, assign tasks, attach documents, add comments and track progress. ",
    href: "/",
    cta: "Learn more",
    className: "col-span-2",
    background: (
      <div className="absolute w-full transform p-5 opacity-60 transition-transform duration-300 [mask-image:linear-gradient(to_top,transparent_64%,#000_80%)] hover:scale-105">
        <Feature1 />
      </div>
    ),
  },
  //   {
  //     Icon: VscDebugDisconnect,
  //     name: "Powerful integrations",
  //     description:
  //       "Integrate popular security software, Connected cameras, IoT devices as well as popular ERP solutions effortlessly.",
  //     href: "/",
  //     cta: "Learn more",
  //     className: "col-span-3 lg:col-span-2",
  //     background: (
  //       <div className="absolute flex w-full transform items-center justify-center p-5 opacity-60 transition-transform duration-300 [mask-image:linear-gradient(to_top,transparent_5%,#000_80%)] hover:scale-105">
  //         <Integrations />
  //       </div>
  //     ),
  //   },
  //   {
  //     Icon: MdOutlineSpaceDashboard,
  //     name: "Leading and lagging KPI indicators",
  //     description:
  //       "Aggregate and share all industry standard KPIs and create a project control centre with customisable dashboards",
  //     href: "/",
  //     cta: "Learn more",
  //     className: "col-span-3 lg:col-span-1",
  //     background: (
  //       <div className="absolute flex w-full transform flex-col items-center justify-center p-5 opacity-60 transition-transform duration-300 [mask-image:linear-gradient(to_top,transparent_25%,#000_80%)] hover:scale-105">
  //         <h1 className="mr-auto text-xl font-bold">Incidents</h1>
  //         <PieChartComponent />
  //       </div>
  //     ),
  //   },
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
