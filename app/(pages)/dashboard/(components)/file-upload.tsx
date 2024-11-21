import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { useRouter } from "next/router";
import React from "react";

const DashbaordFileUpload = () => {
  // const router = useRouter();
  return (
    <div className="flex items-center justify-end gap-x-3 xs:gap-x-6 lg:w-full">
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
      <Button
        className="h-12 w-12 hidden rounded-full sm:flex justify-center items-center bg-primaryOrangeLight/10 hover:bg-primaryOrangeLight/20 p-0"
        onClick={async () => {
          const logoutUser = await logout();
          if (logoutUser?.status === 200) {
            window.location.href = "/auth/login";
          }
        }}
      >
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
  );
};

export default DashbaordFileUpload;
