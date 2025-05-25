import { ContainerScroll, CardSticky } from "@/components/blocks/cards-stack"
import { Button } from "@/components/ui/moving-border"
import { Link } from "react-router-dom"
import { AnimatedGroup } from "@/components/ui/animated-group"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Research and Analysis",
    description:
      "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences. This informed approach ensures your website stands out and provides an excellent user experience.",
  },
  {
    id: "process-2",
    title: "Wireframing and Prototyping",
    description:
      "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages. These visual indigoprints allow us to test and refine the user experience before diving into design.",
  },
  {
    id: "process-3",
    title: "Design Creation",
    description:
      "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life. We focus on aesthetics, ensuring your website not only looks stunning but also aligns perfectly with your brand identity.",
  },
]




const Process = () => {
  return (
    <div className="container min-h-svh place-content-center bg-stone-50 px-6 text-stone-900 xl:px-12">
        <div className="flex flex-col justify justify-center">
         <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <h1
                                        className=" max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16">
                                        Recruit with 10x Speed only with <span className='text-primary'>Zordie</span>
                                    </h1>
                                    <p
                                        className="mt-8 max-w-2xl text-pretty text-lg">
                                       This is a demo line Abdul please tell what to write
                                    </p>
                                </AnimatedGroup>
      <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
        <ContainerScroll className="min-h-[300vh]  flex flex-col items-center justify-center space-y-8 py-12">
          {PROCESS_PHASES.map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              className="rounded-2xl border p-8 shadow-md backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="my-6 text-2xl font-bold tracking-tighter">
                  {phase.title}
                </h2>
                <h3 className="text-2xl font-bold text-indigo-500">
                  {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <p className="text-foreground">{phase.description}</p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
    </div>
  )
}

export { Process }
