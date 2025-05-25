import { type ReactNode } from "react";
import { Component } from "../ui/dropdown";
import type { ItemProps } from "../ui/dropdown";
import { Button } from "../ui/button";



type HeroAgentProps = {
  item: ItemProps;
  heading: string;
  description: string;
  image: string;
};

export default function HeroAgent({ item, heading, description, image }: HeroAgentProps) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* AI Badge */}
            <div className="flex items-center gap-2">
              <Component item={item} />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">{heading}  <span className="text-primary">{item.label}</span></h1>

              {/* Description */}
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold rounded-full"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* Right Visualization */}
          <div className="relative">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <img src={image} alt="Hero visual" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

