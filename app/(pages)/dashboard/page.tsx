import React from "react";
import DashbaordStorage from "./(components)/storage";
import DashboardFileTypes from "./(components)/file-types";

const DashboardPage = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-[42px]">
        <DashbaordStorage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xlg:grid-cols-2 w-full gap-8">
          <DashboardFileTypes />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
