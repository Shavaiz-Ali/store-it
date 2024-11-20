import Image from "next/image";
import React from "react";

const DashbaordSideBar = () => {
  return (
    <div className="hidden remove-scrollbar w-[90px] lg:w-[280px] xl:w-[325px] py-[30px] h-screen sm:flex flex-col overflow-hidden">
      <div className="flex w-full gap-3">
        <div className="flex sm:hidden lg:flex shrink-0 sm:w-[210px]">
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={52}
            width={161}
            className="h-auto hidden sm:block"
          />
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={52}
            width={120}
            className="h-auto sm:hidden block"
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
