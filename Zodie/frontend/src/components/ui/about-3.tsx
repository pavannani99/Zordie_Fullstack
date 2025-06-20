import { Button } from "@/components/ui/button"
import logo from '@/images/Logo.png'
interface aboutProps {
  title?: string
  description?: string
  mainImage?: {
    src: string
    alt: string
  }
  secondaryImage?: {
    src: string
    alt: string
  }
  breakout?: {
    src: string
    alt: string
    title?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
  }
  companiesTitle?: string
  companies?: Array<{
    src: string
    alt: string
  }>
  achievementsTitle?: string
  achievementsDescription?: string
  achievements?: Array<{
    label: string
    value: string
  }>
}


const defaultCompanies = [
  {
    src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", // Official PNG logo from Google's branding
    alt: "Google",
  },
  {
    src: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31", // Official Microsoft logo (often used, from their CDN)
    alt: "Microsoft",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", // Official Apple logo (black variant, SVG from Wikimedia Commons - a common and reliable host for brand logos)
    alt: "Apple",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", // Official Amazon logo (SVG from Wikimedia Commons)
    alt: "Amazon",
  },
  {
    src: "https://zerodha.com/static/images/logo.svg", // Official SVG logo from Zerodha website
    alt: "Zerodha",
  },
  {
    src: "https://www.zohowebstatic.com/sites/zweb/images/commonroot/zoho-logo-web.svg", // Official SVG logo from Zoho website
    alt: "Zoho",
  },
];


const defaultAchievements = [
  { label: "AI-Powered Hires", value: "10,000+" },
  { label: "Enterprises Using Zordie", value: "500+" },
  { label: "Faster Hiring Time", value: "10x" },
  { label: "Candidate Screening Accuracy", value: "98%" },
]

export const About = ({
  title = "Built for the Future of Hiring",
  description = "Zordie AI is a next-generation HR operating system that empowers companies to hire smarter, faster, and more fairly with the help of intelligent AI agents like Prime, Optimus, Nova, Archie, Maxi, and Onix.",
  mainImage = {
    src: "https://img.freepik.com/free-photo/woman-selecting-pictures-people_1134-466.jpg?ga=GA1.1.388426885.1745873696&semt=ais_items_boosted&w=740",
    alt: "Zordie hiring dashboard",
  },
  secondaryImage = {
    src: "https://img.freepik.com/free-vector/flat-recruitment-round-concept_1284-47764.jpg?ga=GA1.1.388426885.1745873696&semt=ais_items_boosted&w=740",
    alt: "AI analysis of candidates",
  },
  breakout = {
    src:logo,
    alt: "Zordie logo",
    title: "Meet the Intelligence Behind Every Great Hire",
    description:
      "From AI-powered evaluations to behavioral insights, Zordie transforms your hiring pipeline into a predictive and performance-driven engine.",
    buttonText: "Explore Zordie Agents",
    buttonUrl: '/prime',
  },
  companiesTitle = "Trusted by Innovative Teams Worldwide",
  companies = defaultCompanies,
  achievementsTitle = "Transforming Hiring Outcomes with AI",
  achievementsDescription = "Our platform helps organizations cut hiring time, improve candidate quality, and make fair, data-backed decisions—powered by the intelligence of Zordie's AI agents.",
  achievements = defaultAchievements,
}: aboutProps = {}) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="fluid-image rounded-xl lg:col-span-2">
            <img
              src={mainImage.src || "/placeholder.svg"}
              alt={mainImage.alt}
              className="size-full max-h-[620px] rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="fluid-about-card flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto cursor-pointer">
              <img
                src={breakout.src || "/placeholder.svg"}
                alt={breakout.alt}
                className="mr-auto h-12 transition-all duration-300"
              />
              <div>
                <p className="mb-2 text-lg font-semibold transition-colors duration-300">{breakout.title}</p>
                <p className="muted-text text-muted-foreground transition-colors duration-300">
                  {breakout.description}
                </p>
              </div>
              <Button variant="outline" className="outline-button mr-auto transition-all duration-300" asChild>
                <a href={breakout.buttonUrl} target="_blank" rel="noreferrer">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <div className="fluid-image grow basis-0 rounded-xl md:w-1/2 lg:min-h-0 lg:w-auto">
              <img
                src={secondaryImage.src || "/placeholder.svg"}
                alt={secondaryImage.alt}
                className="size-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
        <div className="py-32">
          <p className="text-center">{companiesTitle} </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div
                className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 "
                key={company.src + idx}
              >
                <img
                  src={company.src || "/placeholder.svg"}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="fluid-achievements relative overflow-hidden rounded-xl bg-muted p-10 md:p-16 cursor-pointer">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold transition-colors duration-300">{achievementsTitle}</h2>
            <p className="muted-text max-w-screen-sm text-muted-foreground transition-colors duration-300">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4 transition-colors duration-300" key={item.label + idx}>
                <p className="transition-colors duration-300">{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl transition-colors duration-300">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  )
}
