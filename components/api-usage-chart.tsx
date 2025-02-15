import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#",
  },
} satisfies ChartConfig;
interface props {
  chartData: [];
}
export default function ApiUsageChart({ chartData }: props) {
  console.log(chartData);
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          color="black"
          dataKey="day"
          label={"Date"}
          tickLine={false}
          tickMargin={30}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 2)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="messages" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
