"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage } from "@/lib/utils";
import { useMemo } from "react";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const DashbaordChart = ({ used = 50 }: { used: number }) => {
  const chartData = useMemo(() => {
    return [{ storage: "used", 10: used, fill: "white" }];
  }, [used]);

  const endAngle = useMemo(() => {
    return Number(calculatePercentage(used)) + 90;
  }, [used]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-[180px] text-white xl:w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={endAngle}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-white/20 last:fill-primaryOrangeLight"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="storage" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-white text-4xl font-bold"
                    >
                      {used && calculatePercentage(used)
                        ? calculatePercentage(used)
                            .toString()
                            .replace(/^0+/, "")
                        : "0"}
                      %
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-white/70"
                    >
                      Space used
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};
