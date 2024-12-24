import React from "react";
import DashbaordStorage from "./(components)/(root-cmps)/storage";
import DashboardFileTypes from "./(components)/(root-cmps)/file-types";
import DashboardRecentUploads from "./(components)/(root-cmps)/recent-uploads";
import { loggedInUser } from "@/actions/auth/me";
import { getFilesSize } from "@/actions/file-size";
// import { getUsageSummary } from "@/lib/utils";
// import { getFilesSize } from "@/actions/file-size";
import { convertFileSize, formatDateTime, getUsageSummary } from "@/lib/utils";
// import { getFilesSize } from "@/actions/file-size";
// import { getFilesSize } from "@/actions/file-size";

const DashboardPage = async () => {
  const user = await loggedInUser();
  const usageSummary = getUsageSummary();

  if (!user?.user) return;

  // Prefetch all data
  const fileTypesData = await Promise.all(
    usageSummary.map(async (summary) => {
      const { size, updatedAt } = await getFilesSize({
        type: summary.type,
      }).then((data) => ({
        size:
          data?.size && !data?.status
            ? convertFileSize(data.size)
            : convertFileSize(0),
        updatedAt: formatDateTime(data?.updatedAt),
      }));

      return {
        ...summary,
        size,
        updatedAt,
      };
    })
  );

  return (
    <div className="relative w-full grid grid-cols-1 xlg:grid-cols-2 gap-8">
      <div className="space-y-[42px]">
        <DashbaordStorage userDetails={user && user?.user && user?.user} />
        <div className="grid grid-cols-1 md:grid-cols-2 l:grid-cols-1 xlg:grid-cols-2 w-full gap-8">
          <DashboardFileTypes fileTypesData={fileTypesData} />
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
