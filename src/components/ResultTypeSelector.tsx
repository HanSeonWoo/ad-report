import { getLabel } from "@/lib/getLabel";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { RESULT_TYPES } from "@/lib/const";
import { ResultType } from "@/lib/type";

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
              onSelect={(e) => {
                console.log("onSelect", e);
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
