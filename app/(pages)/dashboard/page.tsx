import React from "react";
import DashbaordStorage from "./(components)/(root-cmps)/storage";
import DashboardFileTypes from "./(components)/(root-cmps)/file-types";
import DashboardRecentUploads from "./(components)/(root-cmps)/recent-uploads";

const DashboardPage = () => {
  return (
    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-[42px]">
        <DashbaordStorage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xlg:grid-cols-2 w-full gap-8">
          <DashboardFileTypes />
        </div>
      </div>
      <DashboardRecentUploads />
    </div>
  );
};

export default DashboardPage;
