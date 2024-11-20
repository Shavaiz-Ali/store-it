"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeaderSearch from "./search";
import DashbaordFileUpload from "./file-upload";
import DashboardSidebarMobile from "./sidebar-mobile";

const DashboardHeader = () => {
  const [sidebarMobile, setSidebarMobile] = useState(false);
  return (
    <>
      <header className="flex justify-between items-center h-[116px] w-full">
        <div className="block sm:hidden">
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={52}
            width={120}
            className="h-auto"
          />
        </div>
        <div className="hidden sm:block lg:w-auto w-full">
          <HeaderSearch />
        </div>
        <div className="flex justify-center items-center lg:gap-0 gap-4">
          <DashbaordFileUpload />
          <div
            className="block sm:hidden"
            onClick={() => setSidebarMobile(true)}
          >
            <Image
              src={"/icons/menu.svg"}
              alt=""
              height={30}
              width={30}
              className="h-auto"
            />
          </div>
        </div>
      </header>
      {sidebarMobile && (
        <DashboardSidebarMobile
          sidebarMobile={sidebarMobile}
          setSidebarMobile={setSidebarMobile}
        />
      )}
    </>
  );
};

export default DashboardHeader;
