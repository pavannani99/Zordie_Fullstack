import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

export default function Trial(): JSX.Element {
  // Data for the progress steps
  const progressSteps = [
    {
      title: "Extracting search results from Google",
      items: [
        "Wope is collecting 250K search results. It's hard work, but fun.",
        "Converting shapeless HTMLs into format so AI can understand.",
        "To prioritize those keywords, we need to look at search volume.",
        "We're collecting trends that change your Q3 business strategy.",
      ],
    },
  ];

  return (
    <Card className="relative w-[742px] h-[512px] rounded-2xl bg-[linear-gradient(180deg,rgba(11,2,23,0)_23%,rgba(22,9,42,0.2)_100%)] border-0">
      <div className="absolute top-0 left-0 w-[742px] h-[344px]">
        <img className="w-full h-full" alt="Background visualization" src="" />

        <div className="absolute top-6 left-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Check className="text-white" />
            <h3 className="font-medium">
              Extracting search results from Google
            </h3>
          </div>

          {progressSteps[0].items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 ml-6 mb-2">
              <Check className="text-white h-4 w-4" />
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-4">
          <div className="mb-4">
            <h2 className="text-white text-xl font-medium">Well done 🎉</h2>
            <p className="text-gray-400">
              Now it's our turn. Google's server is being visited by our robots.
            </p>
            <p className="text-gray-400">
              With all that data, you'll soon have insights. Breathe deeply.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col items-center justify-end h-full pb-8">
        <h2 className="text-[28px] font-bold leading-9 text-center mt-[344px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_22%,rgba(255,255,255,0.7)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-['Roboto-Bold',Helvetica]">
          Faster than fastest
        </h2>

        <p className="text-[#9b96b0] text-base text-center tracking-[-0.16px] leading-6 mt-4 font-['Roboto-Regular',Helvetica]">
          From typing your site adress to complete
          <br />
          setup, it only takes 60 seconds - not hours
        </p>
      </CardContent>
    </Card>
  );
}