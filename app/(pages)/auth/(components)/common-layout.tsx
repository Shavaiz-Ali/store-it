import Image from "next/image";
import React from "react";
import Typography from "./typography";

const CommonLayout = () => {
  return (
    <div className="w-1/2 hidden lg:flex flex-col shrink-[0.5] justify-center items-start py-[114px] px-[75px] bg-primaryOrangeLight max-h-screen overflow-hidden gap-y-[96px]">
      {/* <div className="flex justify-center items-center gap-x-2">
        <p className="text-[37px] font-[family-name:var(--font-poppins-medium)] leading-[56px] text-[#ffffff] font-[400]">
          Storeit
        </p>
      </div> */}
      <Image
        src={"/icons/logo-full.svg"}
        alt=""
        height={82}
        width={224}
        className="h-auto"
      />
      <div className="space-y-4">
        <Typography
          variant="h1"
          className="text-[46px] leading-[56px] text-[#ffffff] font-[700]"
        >
          Manage your files the best way
        </Typography>
        <Typography
          variant="p"
          className="text-[16px] leading-[24px] text-[#ffffff]"
        >
          Awesome, we&apos;ve created the perfect place for you to store all
          your documents.
        </Typography>
      </div>
      <div className="flex justify-center items-center w-full">
        <Image
          src={"/images/auth.png"}
          alt="auth image"
          height={242}
          width={242}
          className="text-center self-center"
          priority={false}
        />
      </div>
    </div>
  );
};

export default CommonLayout;
