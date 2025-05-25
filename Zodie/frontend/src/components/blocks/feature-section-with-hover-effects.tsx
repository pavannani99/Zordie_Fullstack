import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  BadgeCheck,
  UserCheck,
  Github,
  BookOpenCheck,
  BrainCircuit,
  Users,
  ThumbsUp,
} from "lucide-react";


export function FeaturesSectionWithHoverEffects() {
 const features = [
  {
    title: "Verified Candidate Profiles",
    description:
      "Cross-verifies GitHub, LinkedIn, and certifications for authenticity and consistency.",
    icon: <BadgeCheck />,
  },
  {
    title: "Smart Skill Evaluation",
    description:
      "Assesses technical, soft, and behavioral skills through AI-driven analysis.",
    icon: <BrainCircuit />,
  },
  {
    title: "Code & Project Originality Check",
    description:
      "Detects plagiarism in GitHub repos and validates genuine contributions.",
    icon: <Github />,
  },
  {
    title: "Cultural Fit Prediction",
    description:
      "Evaluates alignment with company values, team compatibility, and engagement potential.",
    icon: <Users />,
  },
  {
    title: "Candidate Leaderboard",
    description:
      "Ranks candidates dynamically using weighted scoring and comparison metrics.",
    icon: <ThumbsUp />,
  },
  {
    title: "Soft Skills & Communication Analysis",
    description:
      "Analyzes writing samples and interviews to gauge communication and leadership potential.",
    icon: <UserCheck />,
  },
  {
    title: "Work Sample Validation",
    description:
      "AI detects auto-generated content and evaluates skill demonstration in submitted work.",
    icon: <BookOpenCheck />,
  },
  {
    title: "Ethical Evaluation & Compliance",
    description:
      "Ensures fair evaluation with unbiased scoring and transparent audit trails.",
    icon: <ShieldCheck />,
  },
];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
