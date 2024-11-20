import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import HeaderSearch from "./search";

const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center h-[116px] w-full">
      {/* <div className="flex w-full gap-3">
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
        <div className="hidden sm:block lg:w-auto w-full">
          <HeaderSearch />
        </div>
      </div> */}
      <div className="hidden sm:block lg:w-auto w-full">
        <HeaderSearch />
      </div>
      <div className="hidden sm:flex items-center justify-end gap-x-3 xs:gap-x-6 lg:w-full">
        <Button
          type="button"
          className="flex justify-center items-center gap-x-[8px] w-[120px] h-[42px] xs:w-[146px] xs:h-[47px] rounded-[41px] bg-primaryOrangeLight text-white font-[600] text-[15px] leading-[20px] font-[family-name:var(--font-poppins-semibold)] hover:bg-primaryOrangeLight"
        >
          <Image
            src={"/icons/upload.svg"}
            alt=""
            height={15}
            width={20}
            className="h-auto"
          />
          <span>Upload</span>
        </Button>
        <Button className="h-12 w-12 rounded-full flex justify-center items-center bg-primaryOrangeLight/10 hover:bg-primaryOrangeLight/20 p-0">
          <Image
            src={"/icons/logout.svg"}
            alt=""
            height={24}
            width={24}
            className="h-auto"
          />
          {/* <span>Search</span> */}
        </Button>
      </div>
      <div className="block sm:hidden">
        <Image
          src={"/icons/menu.svg"}
          alt=""
          height={30}
          width={30}
          className="h-auto"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
