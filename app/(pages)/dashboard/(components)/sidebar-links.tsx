"use client";

import { sidebarData } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Typography from "../../auth/(components)/typography";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DashbaordSideBarLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center lg:gap-0 gap-4">
      <aside className="w-full h-full mt-8">
        <nav>
          <ul className="flex flex-col gap-y-5 w-full">
            {sidebarData?.map((item) => (
              <Link className="w-full" href={`${item?.link}`} key={item.id}>
                <li
                  className={cn(
                    "h-[60px] w-[60px] lg:w-[253px] flex justify-center items-center gap-x-4 lg:px-1 lg:py-4",
                    {
                      "bg-primaryOrangeLight shadow-lg  shadow-[#4159D64D] rounded-[8px] lg:rounded-[30px] ":
                        pathname === item?.link,
                    }
                  )}
                >
                  <Image
                    src={`${item?.icon}`}
                    className={cn(
                      "w-6 filter invert opacity-25 ",
                      pathname === item?.link && "!invert-0 !opacity-100"
                    )}
                    alt=""
                    height={54}
                    width={54}
                  />
                  <Typography
                    variant="h5"
                    className={cn(
                      "text-backgroundGrayLight  font-[600] lg:block hidden text-start lg:w-1/2 ",
                      {
                        "text-[#ffffff]": pathname === item?.link,
                      }
                    )}
                  >
                    {item?.label}
                  </Typography>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default DashbaordSideBarLinks;
