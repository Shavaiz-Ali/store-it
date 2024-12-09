import Typography from "@/components/typography";
import React from "react";

const DashboardPagesHeader = ({ title }: { title: string }) => {
  return (
    <div className="space-y-2 w-full">
      <Typography variant="h2">{title}</Typography>
      <div className="flex justify-between items-center w-full">
        <Typography variant="h5">
          Total: <span className="font-semibold">0MB</span>
        </Typography>
      </div>
    </div>
  );
};

export default DashboardPagesHeader;
