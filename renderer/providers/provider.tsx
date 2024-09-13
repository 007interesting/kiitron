"use client"

import React, { useEffect, useState } from "react"

import { ModalProvider } from "./modal"
import { ThemeProvider } from "./theme"
import { UserProvider } from "./user"

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ModalProvider>
        <UserProvider>
          <>{children}</>
        </UserProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default Providers
