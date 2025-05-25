import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "What is Zordie AI?",
    answer:
      "Zordie AI is an intelligent HR and hiring platform that streamlines candidate evaluation, interviews, onboarding, and workforce planning through AI agents like Prime, Optimus, Nova, and more.",
  },
  {
    id: "faq-2",
    question: "What does the Prime HR agent do?",
    answer:
      "Prime HR is responsible for advanced candidate evaluation. It verifies credentials, assesses soft and hard skills, analyzes code originality, and predicts cultural fit.",
  },
  {
    id: "faq-3",
    question: "How does candidate scoring work?",
    answer:
      "Candidates are scored using a weighted model that evaluates technical skills, experience, communication, leadership, and alignment with your company’s values.",
  },
  {
    id: "faq-4",
    question: "Can Prime HR detect fake or AI-generated projects?",
    answer:
      "Yes, Prime HR uses code originality checks and AI-content detection to identify plagiarized or auto-generated submissions.",
  },
  {
    id: "faq-5",
    question: "Is Zordie AI suitable for startups?",
    answer:
      "Absolutely. Zordie AI is designed to scale with your business—from early hiring to large enterprise needs. The system is modular and customizable.",
  },
  {
    id: "faq-6",
    question: "How secure is candidate data on Zordie AI?",
    answer:
      "Zordie AI follows strict data privacy protocols, including encrypted storage, compliance monitoring, and audit trails for complete transparency.",
  },
  {
    id: "faq-7",
    question: "Can I integrate Zordie with our current HR tools?",
    answer:
      "Yes, Zordie supports integrations with popular HRMS, ATS, calendar, and messaging tools to ensure a seamless workflow.",
  },
];

const Faq3 = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need more support?",
  supportDescription = "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
  supportButtonText = "Contact Support",
  supportButtonUrl = "https://mail.google.com/mail/?view=cm&to=support@example.com",
}: Faq3Props) => {
  return (
    <section className="pb-[8rem]">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:underline ">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-secondary/10 p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {supportHeading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {supportDescription}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href={supportButtonUrl} target="_blank">
                {supportButtonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 };
