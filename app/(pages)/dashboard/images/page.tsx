/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";
import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import DashboardPagesHeader from "../(components)/(global-cmps)/pages-header";
import { getsearchFilteredData, sortFiles } from "@/lib/utils";
import { Metadata } from "next";

// interface Props {
//   searchParams: {
//     query?: string;
//     sort?: string;
//   };
// }

export const metaData: Metadata = {
  title: "Dashboard - Images",
  description: "Dashboard - Images",
};

const DashbaordImages = async ({
  searchParams,
}: {
  searchParams: Promise<any> | any;
}) => {
  const user = await loggedInUser();
  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }

  const { query, sort } = searchParams;
  const images = user && user?.user && user?.user?.images;

  return (
    <div className="space-y-6">
      <DashboardPagesHeader title="Images" user={user} type="images" />

      {!images || images?.length < 1 ? (
        <Typography variant="h2">
          You haven`&lsquo;t uploaded any images yet.
        </Typography>
      ) : (
        <ListFilesCard
          userId={user?.user?._id}
          user={
            query
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getsearchFilteredData({ query, data: images as any })
              : sort
              ? sortFiles(images, sort)
              : images
          }
          filetype="images"
        />
      )}
    </div>
  );
};

export default DashbaordImages;
