import React from "react"

import Image from "next/image"
import { useRouter } from "next/router"

import { Button, ContainerScroll, HoverBorderGradient } from "../../ui"

const Hero = () => {
  const router = useRouter()

  return (
    <div className="bg-dot-white/[0.2] flex flex-col overflow-hidden p-5">
      <ContainerScroll
        titleComponent={
          <>
            <div className="relative flex w-full flex-col items-center justify-center sm:h-screen">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex items-center bg-black text-white"
              >
                <span className="p-2.5 text-sm">Available in Beta</span>
              </HoverBorderGradient>
              {/* Radial gradient for the container to give a faded look */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <span
                style={{
                  backgroundClip: "text",
                }}
                className="bg-graph-red relative z-20 bg-clip-text py-8 text-center text-4xl font-bold text-transparent sm:text-5xl md:text-8xl"
              >
                Deploy Monitor Optimize
                <br />
                Node Management with Kiitron
              </span>
              <h1 className="sm:text-md mt-[-10px] text-center text-xs font-semibold sm:mt-2 md:text-xl">
                A comprehensive node management solution for Kiichain node runners
              </h1>
              <Button
                onClick={() => {
                  router.push("/deploy")
                }}
                className="bg-dark-2 mb-5 mt-3 rounded-md px-5 py-2.5 text-white bg-blend-saturation shadow-sm shadow-white"
              >
                Get Started
              </Button>
            </div>
          </>
        }
      >
        <div className="bg-dark-3 relative rounded-lg p-1">
          <Image
            src="/images/dashboard.png"
            alt="hero"
            height={820}
            width={1400}
            className="mx-auto h-full object-cover object-left-top"
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  )
}

export default Hero
