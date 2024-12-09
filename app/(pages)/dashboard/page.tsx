import React from "react";
import DashbaordStorage from "./(components)/(root-cmps)/storage";
import DashboardFileTypes from "./(components)/(root-cmps)/file-types";
import DashboardRecentUploads from "./(components)/(root-cmps)/recent-uploads";
import { loggedInUser } from "@/actions/auth/me";

const DashboardPage = async () => {
  const user = await loggedInUser();
  // console.log("user from page", user);s
  return (
    <div className="relative w-full grid grid-cols-1 xlg:grid-cols-2 gap-8">
      <div className="space-y-[42px]">
        <DashbaordStorage userDetails={user && user?.user && user?.user} />
        <div className="grid grid-cols-1 md:grid-cols-2 l:grid-cols-1 xlg:grid-cols-2 w-full gap-8">
          <DashboardFileTypes userDetails={user && user?.user && user?.user} />
        </div>
      </div>
      <DashboardRecentUploads
        recentUploads={user && user?.user && user?.user?.recentUploads}
        user={user?.user}
      />
    </div>
  );
};

export default DashboardPage;
