import React from "react";
import { BrainCircuit, CalendarPlus, Edit2Icon } from "lucide-react";
import { IoText } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HamburgerMenuIcon, InputIcon } from "@radix-ui/react-icons";
import { BentoCard, BentoGrid, ShinyText } from "../../ui";
import cn from "../../utils/cn";
import Feature1 from "../features/feature-1";

const features = [
  {
    Icon: BrainCircuit,
    name: "Automated Node Setup",
    description:
      "Fully automated node setup process with minimal user input, simplifying the entire process for users of all expertise levels.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1",
    background: (
      <div className="absolute inset-0 flex transform flex-col items-center justify-center p-6 opacity-80 transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_top,transparent_20%,#000_80%)] group-hover:scale-105">
        <h1 className="mb-2 text-left text-xl font-bold text-gray-800 dark:text-gray-100">Automated Setup</h1>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          The entire node setup is automated with dependency management, reducing complexity and manual effort.
        </p>
        <div className="flex w-full gap-3">
          <div className="flex h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-2 shadow-md transition-all duration-200 hover:border-blue-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <BrainCircuit className="h-6 w-6 text-blue-500" />
            <h2 className="mt-2 text-sm font-semibold">Automation</h2>
          </div>
          <div className="flex h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-2 shadow-md transition-all duration-200 hover:border-green-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <IoText className="h-6 w-6 text-green-500" />
            <h2 className="mt-2 text-sm font-semibold">Efficiency</h2>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: MdOutlineSpaceDashboard,
    name: "Integrated Monitoring Dashboard",
    description:
      "Track node health, performance metrics, resource consumption, and receive real-time alerts for operational efficiency.",
    href: "/",
    cta: "Learn more",
    className: "col-span-2",
    background: (
      <div className="absolute inset-0 w-full transform p-6 opacity-90 transition-all duration-300 ease-in-out group-hover:scale-105">
        <Feature1 />
      </div>
    ),
  },
  {
    Icon: MdOutlineSpaceDashboard,
    name: "Testnet Faucet & Validator Dashboard",
    description: "Effortlessly manage testnet tokens and validators with an integrated dashboard for enhanced control and insights.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <></>,
  },
];

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black bg-dot-white/[0.4] bg-gradient-to-b from-gray-50 to-white px-4 py-16 dark:from-gray-900 dark:to-black sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="mb-12 text-center">
          <ShinyText className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:from-blue-600 hover:to-purple-700">
            <span>✨ Cool product features</span>
          </ShinyText>
          <h2 className="mt-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl lg:text-6xl dark:from-gray-100 dark:to-gray-300">
            Features Tailored for Node Management
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Kiitron simplifies node management, deployment, and monitoring with cutting-edge automation and security features.
          </p>
        </div>
        
        <BentoGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <BentoCard
              key={idx}
              {...feature}
              className={cn(
                "group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-blue-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500",
                feature.className
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default Features;

