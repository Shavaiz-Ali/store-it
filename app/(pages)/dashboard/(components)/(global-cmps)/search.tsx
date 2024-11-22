import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const HeaderSearch = () => {
  return (
    <div className="flex items-start gap-x-[10px] h-[52px] w-[90%] lg:w-[482px] rounded-[30px] p-[16px] shadow-lg shadow-[#5968B20F] border">
      <Image
        src={"/icons/search.svg"}
        alt=""
        height={15}
        width={16}
        className="h-auto"
      />
      <Input
        type="text"
        placeholder="Search"
        className="border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-[20px] text-backgroundGrayDark font-[family-name:var(--font-poppins-semibold)] text-sm leading-5 focus:text-backgroundGrayLight focus:font-[600] focus:placeholder:font-[400] focus:placeholder:text-backgroundGrayDark"
      />
    </div>
  );
};

export default HeaderSearch;
