import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";
import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import DashboardPagesHeader from "../(components)/(global-cmps)/pages-header";
import { getsearchFilteredData } from "@/lib/utils";

type Props = {
  searchParams: {
    query: string;
  };
};

const DashbaordImages = async ({ searchParams }: Props) => {
  const user = await loggedInUser();
  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }
  const { query } = await searchParams;
  const images = user && user?.user && user?.user?.images;
  return (
    <div className="space-y-6">
      <DashboardPagesHeader title="Images" />

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
              : images
          }
          filetype="images"
        />
      )}
    </div>
  );
};

export default DashbaordImages;
