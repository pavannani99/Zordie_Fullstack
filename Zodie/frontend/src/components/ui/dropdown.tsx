import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bolt, ChevronDown, CopyPlus, Files, Layers2} from "lucide-react";
import type { JSX } from "react";
import { Link } from "react-router-dom";


type AgentLink = {
  label: string;
  to: string;
  icon: JSX.Element;
};

export type ItemProps = {
  label: string;
  agents: AgentLink[]; // now dynamic and scalable
};

type ComponentProps = {
  item: ItemProps;
};

function Component({ item }: ComponentProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {item.label}
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Split into 2 groups if needed */}
        <DropdownMenuGroup>
          {item.agents.slice(0, 2).map((agent, idx) => (
            <Link to={agent.to} key={idx}>
              <DropdownMenuItem>
                {agent.icon}
                <span className="ms-2">{agent.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          {item.agents.slice(2).map((agent, idx) => (
            <Link to={agent.to} key={idx + 2}>
              <DropdownMenuItem>
                {agent.icon}
                <span className="ms-2">{agent.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { Component };
