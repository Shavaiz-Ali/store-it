import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";

const DashboardImages = async () => {
  const user = await loggedInUser();

  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }

  const media = user && user?.user && user?.user?.videos;

  if (!media || media?.length < 1) {
    return (
      <Typography variant="h2">
        You haven`&lsquo;t uploaded any media yet.
      </Typography>
    );
  }

  console.log(user);
  return (
    <div>
      <ListFilesCard user={media} />
    </div>
  );
};

export default DashboardImages;
