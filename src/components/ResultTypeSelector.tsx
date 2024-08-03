import { RESULT_TYPES } from "@/lib/const";
import { getLabel } from "@/lib/getLabel";
import { ResultType } from "@/lib/type";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  resultType: ResultType;
  onSelect: (type: ResultType) => void;
};
export default function ResultTypeSelector({ onSelect, resultType }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          {getLabel(resultType)}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {RESULT_TYPES.map((type) => {
          return (
            <DropdownMenuItem
              key={type}
              className="capitalize"
              onSelect={() => {
                onSelect(type);
              }}
            >
              {getLabel(type)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
