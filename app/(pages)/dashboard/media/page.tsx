import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";
import DashboardPagesHeader from "../(components)/(global-cmps)/pages-header";

const DashboardImages = async () => {
  const user = await loggedInUser();

  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }

  const media = user && user?.user && user?.user?.videos;
  return (
    <div className="space-y-6">
      <DashboardPagesHeader title="Media" type="videos" user={user} />
      {!media || media?.length < 1 ? (
        <Typography variant="h2">
          You haven`&lsquo;t uploaded any media yet.
        </Typography>
      ) : (
        <ListFilesCard
          userId={user?.user?._id}
          user={media}
          filetype="videos"
        />
      )}
    </div>
  );
};

export default DashboardImages;
