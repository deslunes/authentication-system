import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";

export default function CustomTooltip(props) {
    return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
                {props.children}
            </TooltipTrigger>
            <TooltipContent side={props.side}>{props.content}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
    )
  }
  