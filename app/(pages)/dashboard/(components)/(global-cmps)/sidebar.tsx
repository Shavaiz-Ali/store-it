/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import Typography from "../../../../../components/typography";
import DashbaordSideBarLinks from "./sidebar-links";

const DashbaordSideBar = ({ user }: any) => {
  // console.lo;
  return (
    <div className="w-full h-full sm:flex flex-col justify-between items-start overflow-hidden">
      <div className="flex flex-col  w-full gap-3">
        <div className="flex sm:hidden lg:flex shrink-0 sm:w-[210px]">
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={52}
            width={161}
            className="h-auto hidden sm:block"
            priority={false}
          />
        </div>
        <div className="hidden sm:flex lg:hidden">
          <Image
            src={"/icons/logo-brand.svg"}
            alt=""
            height={52}
            width={52}
            className="h-auto"
            priority={false}
          />
        </div>
        {/* sidebar */}
        <DashbaordSideBarLinks />
      </div>
      <div className="self-start">
        <div className="relative size-20 lg:size-60 ">
          <Image
            src={"/sidebarIllus.svg"}
            alt="image"
            fill
            className="h-auto"
          />
        </div>
        <div className="flex justify-center items-center lg:gap-2 w-full lg:bg-[#fff0f1] rounded-full lg:p-2">
          <div className="relative size-10 rounded-full overflow-hidden">
            <Image
              src={"/user.webp"}
              alt=""
              fill
              className="rounded-full w-full h-full"
              priority={false}
            />
          </div>
          <div className="hidden lg:flex flex-col justify-between items-start">
            <Typography variant="h5" className="text-[14px] font-[600]">
              {user?.user?.fullName}
            </Typography>
            <Typography
              variant="p"
              className="text-[12px] text-primaryBlueDark"
            >
              {user?.user?.email}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbaordSideBar;

// .nav-icon {
//   @apply w-6 filter invert opacity-25 !important;
// }
// .nav-icon-active {
//   @apply invert-0 opacity-100 !important;
// }
