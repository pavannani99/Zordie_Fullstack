import { ContainerScroll } from "@/components/ui/CS"

export default function ScrollAnimationDemo() {
  return (
    <div className="flex flex-col overflow-hidden  min-h-screen">
      <ContainerScroll>
        <img
          src="https://framerusercontent.com/images/Tb7VqW7xHrIJevRarCi90qfwCA.png"
          alt="Dashboard"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
