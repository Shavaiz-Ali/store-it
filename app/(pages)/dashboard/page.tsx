import React from "react";
import DashbaordStorage from "./(components)/(root-cmps)/storage";
import DashboardFileTypes from "./(components)/(root-cmps)/file-types";
import DashboardRecentUploads from "./(components)/(root-cmps)/recent-uploads";
import { loggedInUser } from "@/actions/auth/me";
// import { convertFileSize, formatDateTime, getUsageSummary } from "@/lib/utils";
// import { getFilesSize } from "@/actions/file-size";
// import { getFilesSize } from "@/actions/file-size";

const DashboardPage = async () => {
  const user = await loggedInUser();
  // const usageDetails = await Promise.all([getFilesSize()])

  // const fetchUsageData = async () => {
  //   const usageSummary = getUsageSummary();
  //   const resolvedData = await Promise.all(
  //     usageSummary.map(async (summary) => {
  //       const { size, updatedAt } = await getFilesSize({
  //         type: summary?.type,
  //       })
  //         .then((result) => ({
  //           size:
  //             result?.size && !result?.status
  //               ? convertFileSize(result.size)
  //               : convertFileSize(0),
  //           updatedAt: formatDateTime(result?.updatedAt),
  //         }))
  //         .catch(() => ({
  //           size: convertFileSize(0),
  //           updatedAt: "Unknown",
  //         }));
  //       return {
  //         url: summary.url,
  //         color: summary.color,
  //         icon: summary.icon,
  //         title: summary.title,
  //         size,
  //         updatedAt,
  //       };
  //     })
  //   );

  //   return resolvedData;
  // };

  // (async () => {
  //   const usageSummary = getUsageSummary();
  //   await Promise.all(
  //     usageSummary.map((summary) => {
  //       getFilesSize({ type: summary.type })
  //         .then((result) => {
  //           getUsageSummary({
  //             size: result?.size?.size,
  //             updatedAt: result?.size?.updatedAt,
  //           });
  //         })
  //         .catch(() => {
  //           getUsageSummary({
  //             size: 0,
  //             updatedAt: "Unknown",
  //           });
  //         });
  //     })
  //   );
  // })();
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
