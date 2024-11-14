import Image from "next/image";
import React from "react";

const CommonLayout = () => {
  return (
    <div className="w-1/2 hidden lg:flex flex-col shrink-[0.5] justify-center items-start py-[114px] px-[75px] bg-primaryOrangeLight max-h-screen overflow-hidden gap-y-[96px]">
      <div className="flex justify-center items-center gap-x-2">
        <p className="text-[37px] font-[family-name:var(--font-poppins-medium)] leading-[56px] text-[#ffffff] font-[400]">
          Storeit
        </p>
      </div>
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-poppins-bold)] text-[46px] leading-[56px] text-[#ffffff] font-[700]">
          Manage your files the best way
        </h1>
        <p className="text-[16px] leading-[24px] font-[family-name:var(--font-poppins-regular)] text-[#ffffff] font-normal">
          Awesome, we&apos;ve created the perfect place for you to store all
          your documents.
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <Image
          src={"/images/auth.png"}
          alt="auth image"
          height={242}
          width={242}
          className="text-center self-center"
        />
      </div>
    </div>
  );
};

export default CommonLayout;
