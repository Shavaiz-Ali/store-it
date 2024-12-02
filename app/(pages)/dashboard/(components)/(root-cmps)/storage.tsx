/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DashbaordChart } from "./chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Typography from "../../../../../components/typography";

const DashbaordStorage = ({ userDetails }: { userDetails: any }) => {
  return (
    <div className="w-full h-auto rounded-[20px] bg-primaryOrangeLight shadow-lg shadow-[#4159D64D] p-2 flex justify-center items-center">
      <Card className="border-0 bg-transparent p-0">
        <CardContent className="p-0 flex flex-wrap justify-center items-center gap-x-1">
          <DashbaordChart used={50} />
          <CardHeader className="p-0">
            <Typography
              variant="h3"
              className="leading-[26px] text-white font-[600]"
            >
              <span>Available storage</span>
            </Typography>
            <CardDescription>
              <Typography
                variant="p"
                className="text-white/70 flex justify-center items-center gap-x-3"
              >
                <span>0.0MB</span>
                <span>/</span>
                <span>3GB</span>
              </Typography>
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashbaordStorage;
