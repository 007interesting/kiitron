import React, { ReactNode } from "react"

import { motion, MotionValue } from "framer-motion"

interface HeaderProps {
  translate: MotionValue<number>
  titleComponent: ReactNode
}

const Header: React.FC<HeaderProps> = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export default Header
