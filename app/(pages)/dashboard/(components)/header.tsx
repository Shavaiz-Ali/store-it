import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import HeaderSearch from "./search";

const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center h-[116px] w-full">
      <div className="flex justify-between w-full gap-12">
        <Image
          src={"/icons/logo-full-brand.svg"}
          alt=""
          height={52}
          width={161}
          className="h-auto"
        />
        <HeaderSearch />
      </div>
      <div className="flex items-center justify-end gap-x-6 w-full">
        <Button
          type="button"
          className="flex justify-center items-center gap-x-[8px] w-[136px] h-[52px] rounded-[41px] bg-primaryOrangeLight text-white font-[600] text-[15px] leading-[20px] font-[family-name:var(--font-poppins-semibold)] hover:bg-primaryOrangeLight"
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
        <Button className="!bg-transparent p-0">
          <Image
            src={"/icons/logout.svg"}
            alt=""
            height={24}
            width={24}
            className="h-auto"
          />
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
