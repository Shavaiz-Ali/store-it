import Image from "next/image";
import React from "react";
import Typography from "../../auth/(components)/typography";
import DashbaordSideBarLinks from "./sidebar-links";

const DashbaordSideBar = () => {
  // console.lo;
  return (
    <div className="hidden remove-scrollbar w-[90px] lg:w-[280px] xl:w-[325px] py-[30px] h-screen sm:flex flex-col justify-between items-start overflow-hidden">
      <div className="flex flex-col  w-full gap-3">
        <div className="flex sm:hidden lg:flex shrink-0 sm:w-[210px]">
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={52}
            width={161}
            className="h-auto hidden sm:block"
          />
        </div>
        <div className="hidden sm:flex lg:hidden">
          <Image
            src={"/icons/logo-brand.svg"}
            alt=""
            height={52}
            width={52}
            className="h-auto"
          />
        </div>
        {/* sidebar */}
        <DashbaordSideBarLinks />
      </div>
      <div className="space-y-4 self-start">
        <div className="relative size-20 lg:size-60 ">
          <Image
            src={"/sidebarIllus.svg"}
            alt="image"
            fill
            className="h-auto"
          />
        </div>
        <div className="flex justify-center items-center lg:gap-4 w-full lg:bg-[#fff0f1] rounded-full lg:p-2">
          <div className="relative size-10 rounded-full overflow-hidden">
            <Image
              src={"/user.webp"}
              alt=""
              fill
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="hidden lg:flex flex-col justify-between items-start">
            <Typography variant="h5" className="text-[14px] font-[600]">
              Shavaiz Ali
            </Typography>
            <Typography variant="p" className="text-primaryBlueDark">
              hello@example.com
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
