import Typography from "@/components/typography";
import React from "react";
import DashboardSort from "./sort";

const DashboardPagesHeader = ({ title }: { title: string }) => {
  return (
    <div className="space-y-2 w-full">
      <Typography variant="h2">{title}</Typography>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center w-full sm:gap-0 gap-y-5">
        <Typography variant="h5">
          Total: <span className="font-semibold">0MB</span>
        </Typography>
        <div className="flex justify-center items-center gap-x-2 sm:w-auto w-full">
          <Typography className="sm:block hidden" variant="p">
            Sort By :
          </Typography>
          <DashboardSort />
        </div>
      </div>
    </div>
  );
};

export default DashboardPagesHeader;
