"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HeaderSearch from "./search";
import DashbaordFileUpload from "./file-upload";
import DashboardSidebarMobile from "./sidebar-mobile";

const DashboardHeader = () => {
  const [sidebarMobile, setSidebarMobile] = useState(false);
  // const [files, setFiles] = useState<FileList | null>(null);

  // console.log("selectd files", files);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 639) {
        setSidebarMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleUploadFiles = (files: FileList | null) => {
  //   console.log(files);
  // };

  return (
    <>
      <header className="flex justify-between items-center h-[116px] w-full lg:gap-4">
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
            className="block sm:hidden cursor-pointer"
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
