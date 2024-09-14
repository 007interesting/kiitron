import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, ContainerScroll, HoverBorderGradient } from "../../ui";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-black bg-gradient-to-b from-gray-900 to-black bg-dot-white/[0.4] text-white">
      <ContainerScroll
        titleComponent={
          <div className="relative flex w-full flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8">
            <HoverBorderGradient
              containerClassName="rounded-full mb-8"
              as="button"
              className="flex items-center bg-gray rounded-full text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="px-4 py-2 text-sm font-medium">Available in Beta</span>
            </HoverBorderGradient>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-radial from-transparent to-black opacity-70"></div>

            <h1 className="relative z-20 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block">
                Deploy Monitor Optimize
              </span>
              <span className="mt-2 block text-white">
                Node Management with Kiitron
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-gray-400 text-center text-xl z-20">
              Unlock the full potential of your Kiichain nodes with our comprehensive management solution.
            </p>

            <h2 className="mt-4 text-center text-lg z-20 text-gray-500 font-semibold text-white sm:text-xl md:text-2xl">
              A comprehensive node management solution for Kiichain node runners
            </h2>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/deploy")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
              <Button
                onClick={() => router.push("/features")}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black"
              >
                Learn More
              </Button>
            </div>
          </div>
        }
      >
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/dashboard.png"
            alt="Kiitron Dashboard"
            width={1400}
            height={720}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <span className="text-white font-semibold">Kiitron Dashboard</span>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </ContainerScroll>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "fas fa-lock", title: "Secure Node Management", description: "Ensure the safety of your nodes with our advanced security measures." },
              { icon: "fas fa-chart-line", title: "Real-time Monitoring", description: "Keep track of your node's performance with instant updates and alerts." },
              { icon: "fas fa-cog", title: "Automated Optimization", description: "Maximize efficiency with our AI-driven optimization tools." },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 transition-all duration-300 ease-in-out transform scale-95 hover:scale-100 hover:shadow-lg">
                <i className={`${feature.icon} text-4xl text-purple-500 mb-4`}></i>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
