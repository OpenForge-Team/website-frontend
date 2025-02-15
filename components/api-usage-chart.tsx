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
  // Create an array of the last 30 days
  const paddedData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      messages: 0
    };
  }).reverse();

  // Merge existing data with padded data
  const mergedData = paddedData.map(pad => {
    const match = chartData.find(d => d.date === pad.date);
    return {
      date: pad.date,
      messages: match ? match.count : 0
    };
  });

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
