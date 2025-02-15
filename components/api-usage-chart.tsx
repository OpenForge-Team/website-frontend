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
  chartData: { date: string; count: number }[];
}

export default function ApiUsageChart({ chartData }: props) {
  return (
    <ChartContainer config={chartConfig} className="h-auto w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          color="black"
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="messages" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
