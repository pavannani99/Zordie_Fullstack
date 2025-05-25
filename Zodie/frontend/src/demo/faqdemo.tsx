import { Faq3 } from "@/components/blocks/faq3"

const demoData = {
  heading: "Frequently Asked Questions",
  description:
    "Everything you need to know about Zordie AI and our intelligent hiring agents. Can't find the answer you're looking for? Feel free to contact our support team.",
  items: [
    {
      id: "faq-1",
      question: "What is Zordie AI?",
      answer:
        "Zordie AI is an intelligent HR and hiring platform powered by AI agents that automate candidate evaluation, interviews, onboarding, analytics, and compliance.",
    },
    {
      id: "faq-2",
      question: "What does the Prime HR agent do?",
      answer:
        "Prime HR is responsible for advanced candidate screening. It evaluates technical and soft skills, checks code originality, verifies credentials, and predicts cultural fit.",
    },
    {
      id: "faq-3",
      question: "How does Zordie score and rank candidates?",
      answer:
        "Candidates are ranked using a multi-layered scoring model that factors in experience, skills, personality alignment, and behavioral indicators. Scores are displayed via a dynamic leaderboard.",
    },
    {
      id: "faq-4",
      question: "Can Zordie integrate with existing HR tools?",
      answer:
        "Yes, Zordie supports integrations with ATS, calendars, email platforms, and communication tools to ensure a smooth workflow.",
    },
    {
      id: "faq-5",
      question: "Is Zordie suitable for startups and small teams?",
      answer:
        "Absolutely. Zordie’s modular setup allows startups to scale hiring operations efficiently, with no overhead or technical complexity.",
    },
  ],
  supportHeading: "Still have questions?",
  supportDescription:
    "Can't find the answer you're looking for? Our support team is here to help with anything related to Zordie AI.",
  supportButtonText: "Contact Support",
  supportButtonUrl: "https://mail.google.com/mail/?view=cm&to=abdul@zordie.com",
};


function Faq3Demo() {
  return <Faq3 {...demoData} />;
}

export { Faq3Demo };
