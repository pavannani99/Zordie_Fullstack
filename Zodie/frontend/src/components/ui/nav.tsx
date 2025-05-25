"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MenuItem, MegaMenu } from "@/components/ui/Navbar"
import Logo from '@/images/Logo.png'
import platform from '@/images/Platform.png'
import solutions from '@/images/Solutions.png'
import agents from '@/images/Agents.png'
import resource from '@/images/resources.jpg'
import about from '@/images/about.jpg'
const menuItems = [
  {
    name: "Platform",
    href: "/",
    megaMenu: {
      title: "Agentic Automation",
      description: "Learn more about the next generation of process automation",
      image: platform,
      items: [
        { name: "Home", href: "/" },
      ],
    },
  },
  {
    name: "AI Agents",
    href: "/prime",
    megaMenu: {
      title: "AI Agents",
      description: "Discover our powerful AI agents for your business",
      image: agents,
      items: [
        { name: "Prime HR", href: "/prime" },
        { name: "Onix", href: "/onix" },
        { name: "Nova", href: "/Nova" },
        { name: "Maxi", href: "/maxi" },
        { name: "Optimus", href: "/optimus" },
        { name: "Archie", href: "/archie" },
      ],
    },
  },
  {
    name: "Solutions",
    href:'#',
    megaMenu: {
      title: "Solutions",
      description: "We cater all the Hr related things",
      image: solutions,
      items: [
        { name: "Solutions", href: "/solution" },
        {name:"Pricing",href:"/pricing"}
      ],
    },
  },
  {
    name: "Resources",
    href: "#",
    megaMenu: {
      title: "Resources",
      description: "Learn and grow with our comprehensive resources",
      image: resource,
      items: [
        { name: "Documentation", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
  },
  {
    name: "About",
    href: "#",
    megaMenu: {
      title: "About Us",
      description: "Learn more about our company and mission",
      image:about,
      items: [
        { name: "Our Story", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  },
]

export default function Navbar() {
  const [menuState, setMenuState] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <nav
      data-state={menuState && "active"}
      className={cn(
        "group fixed z-50 w-full border-b transition-colors duration-150 bg-white",
        scrolled && "bg-white md:bg-background/50 backdrop-blur-3xl",
      )}
      onMouseLeave={() => setActiveItem(null)}
    >
      <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
            <Link to="/" aria-label="home" className="flex items-center space-x-2">
              <img src={Logo} className="h-16 md:h-20"></img>
            </Link>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState == true ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
              <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
            </button>

            <div className="hidden lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <MenuItem setActive={setActiveItem} active={activeItem} item={item.name}>
                      {item.megaMenu && (
                        <MegaMenu
                          title={item.megaMenu.title}
                          description={item.megaMenu.description}
                          image={item.megaMenu.image}
                          items={item.megaMenu.items}
                        />
                      )}
                    </MenuItem>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
            <div className="lg:hidden">
              <ul className="space-y-6 text-base">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
              <Button asChild variant="outline" size="sm">
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
