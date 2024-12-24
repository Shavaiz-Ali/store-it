import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";
import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import DashboardPagesHeader from "../(components)/(global-cmps)/pages-header";
import { getsearchFilteredData, sortFiles } from "@/lib/utils";

type Props = {
  searchParams: {
    query?: string;
    sort?: string;
  };
};

const DashbaordImages = async ({ searchParams }: Props) => {
  const user = await loggedInUser();
  console.log(await searchParams);
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
