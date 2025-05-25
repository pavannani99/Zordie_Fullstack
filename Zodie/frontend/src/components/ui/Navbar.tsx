"use client"
import type React from "react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void
  active: string | null
  item: string
  children?: React.ReactNode
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <span className="cursor-pointer text-muted-foreground hover:text-primary block duration-150">{item}</span>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-background rounded-xl overflow-hidden border shadow-2xl shadow-zinc-300/20 dark:shadow-none w-max"
              >
                <motion.div layout className=" bg-blue-200  w-full h-full p-6">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export const MegaMenu = ({
  title,
  description,
  image,
  items,
}: {
  title: string
  description: string
  image: string
  items: { name: string; href: string }[]
}) => {
  return (
    <div className="flex gap-8">
      <div className="max-w-[300px]">
        <div className="rounded-xl overflow-hidden bg-zinc-900 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-zinc-400 mb-4">{description}</p>
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto rounded-lg" />
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">{title}</h4>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.href} className="text-muted-foreground hover:text-primary block duration-150">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const HoveredLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link to={href} className="text-muted-foreground hover:text-primary block duration-150">
      {children}
    </Link>
  )
}

export const Menu = ({ setActive, children }: { setActive: (item: string) => void; children: React.ReactNode }) => {
  return <>{children}</>
}

export const ProductItem = ({
  title,
  href,
  src,
  description,
}: { title: string; href: string; src: string; description: string }) => {
  return (
    <Link to={href} className="group relative block overflow-hidden rounded-xl">
      <img
        src={src || "/placeholder.svg"}
        alt={title}
        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
    </Link>
  )
}
