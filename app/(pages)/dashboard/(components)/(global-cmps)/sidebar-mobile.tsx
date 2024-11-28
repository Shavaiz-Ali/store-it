import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Typography from "../../../../../components/typography";
import { X } from "lucide-react";
import { logout } from "@/actions/auth/logout";
import DashbaordSideBarLinks from "./sidebar-links";
const DashboardSidebarMobile = ({
  sidebarMobile,
  setSidebarMobile,
}: {
  sidebarMobile: boolean;
  setSidebarMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Sheet open={sidebarMobile} onOpenChange={setSidebarMobile}>
      <SheetContent className="py-4 px-2 flex flex-col justify-between h-full">
        <SheetHeader>
          <div className="flex justify-between items-center gap-2 w-full bg-[#fff0f1] rounded-full p-2">
            <div className="flex items-center gap-2">
              <div className="relative size-10 rounded-full overflow-hidden">
                <Image
                  src={"/user.webp"}
                  alt=""
                  fill
                  className="rounded-full w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-between items-start">
                <Typography variant="h5" className="text-[14px] font-[600]">
                  Shavaiz Ali
                </Typography>
                <Typography variant="p" className="text-primaryBlueDark">
                  hello@example.com
                </Typography>
              </div>
            </div>
            <Button
              className="rounded-full size-10 bg-primaryOrangeLight/20 hover:bg-primaryOrangeLight/30 text-backgroundGrayLight border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={() => setSidebarMobile(false)}
            >
              <X size={16} />
            </Button>
          </div>

          <DashbaordSideBarLinks setSidebarMobile={setSidebarMobile} />
        </SheetHeader>

        <SheetFooter className="mt-5">
          <Button
            className="w-full h-14 rounded-[30px] flex justify-center items-center bg-primaryOrangeLight/10 hover:bg-primaryOrangeLight/20 gap-3"
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
            <Typography variant="p" className="text-primaryOrangeLight">
              Logout
            </Typography>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebarMobile;
