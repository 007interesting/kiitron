import React from "react"
import { ReactNode } from "react"
import { IconType } from "react-icons"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import cn from "../../utils/cn"
import { Button } from "../button"

export const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  )
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType | IconType
  description: string
  href: string
  cta: string
}) => (
  <div
    className={cn(
      "group relative flex h-[22rem] flex-col overflow-hidden rounded-xl",
      "bg-white shadow-lg transition-all duration-300",
      "dark:bg-gray-800 dark:border dark:border-gray-700",
      "hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500",
      className
    )}
  >
    {/* Background container */}
    <div className="inset-0 z-0 overflow-hidden">
      <div className="inset-0 bg-gradient-to-b from-transparent via-white to-white opacity-90 dark:via-gray-800 dark:to-gray-800" />
      <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-110">
        {background}
      </div>
    </div>
    
   {/* Content container */}
    <div className="relative z-10 flex flex-col justify-between h-full p-6">
      <div className="space-y-3">
        <Icon className="h-10 w-10 text-neutral-700 dark:text-neutral-300" />
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{name}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">{description}</p>
      </div>
      <div className="pt-4">
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="w-full justify-between bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90"
        >
          <a href={href} className="flex items-center justify-between">
            <span>{cta}</span>
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  </div>
)

export default BentoGrid
