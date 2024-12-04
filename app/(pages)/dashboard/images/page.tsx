import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";
import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";

const DashbaordImages = async () => {
  const user = await loggedInUser();
  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }

  const images = user && user?.user && user?.user?.images;

  if (!images || images?.length < 1) {
    return (
      <Typography variant="h2">
        You haven`&lsquo;t uploaded any images yet.
      </Typography>
    );
  }

  console.log(user);

  return (
    <div>
      <ListFilesCard userId={user?.user?._id} user={images} filetype="images" />
    </div>
  );
};

export default DashbaordImages;
