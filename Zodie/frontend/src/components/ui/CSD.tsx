import { ContainerScroll } from "@/components/ui/CS"
import dash from '@/assets/Hero section.png'
export default function ScrollAnimationDemo() {
  return (
    <div className="flex flex-col overflow-hidden  min-h-screen">
      <ContainerScroll>
        <img
          src={dash}
          alt="Dashboard"
          className="mx-auto rounded-2xl object-cover h-full  object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
