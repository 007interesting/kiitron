import React from "react"

import Head from "next/head"

import { Features, Hero } from "../components"
import { Provider } from "../providers"

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <Provider>
        <div className="dark bg-gradient-to-b from-gray-900 to-black bg-dot-white/[0.2]">
          {/* Hero section */}
          <Hero />

          {/* Features */}
          <Features />
        </div>
      </Provider>
    </>
  )
}

export default HomePage
