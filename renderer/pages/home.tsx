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
        <div className="dark">
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
