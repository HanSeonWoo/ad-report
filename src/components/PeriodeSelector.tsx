import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YEARS, MONTHS } from "@/lib/const";

type Props = {
  year: number;
  month?: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth?: React.Dispatch<React.SetStateAction<number>>;
};

export default function PeriodeSelector({
  year,
  month,
  setYear,
  setMonth,
}: Props) {
  return (
    <div className="flex flex-row space-x-2">
      <Select
        value={year.toString()}
        onValueChange={(value) => setYear(Number(value))}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {item}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!!month && !!setMonth && (
        <Select
          value={month.toString()}
          onValueChange={(value) => setMonth(Number(value))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((mon) => (
              <SelectItem key={mon} value={mon.toString()}>
                {mon}월
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
