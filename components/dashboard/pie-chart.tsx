"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AnalyticsCard from "./analytics-card";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#2563EB",
  },
  safari: {
    label: "Safari",
    color: "#61A8FB",
  },
  firefox: {
    label: "Firefox",
    color: "#3B86F7",
  },
  edge: {
    label: "Edge",
    color: "#90C7FE",
  },
  other: {
    label: "Other",
    color: "#BEDCFE",
  },
} satisfies ChartConfig;

export function PieGraph() {
  return (
    <AnalyticsCard title="Traffic Pie Chart" subtitle="Showing visitors from different browsers">
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] px-0"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="visitors" hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          labelLine={false}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="hsla(var(--foreground))"
              >
                {payload.visitors}
              </text>
            );
          }}
          nameKey="browser"
        />
      </PieChart>
    </ChartContainer></AnalyticsCard>
  );
}
