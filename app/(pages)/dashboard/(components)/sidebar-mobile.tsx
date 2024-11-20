import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
const DashboardSidebarMobile = ({
  sidebarMobile,
  setSidebarMobile,
}: {
  sidebarMobile: boolean;
  setSidebarMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Sheet open={sidebarMobile} onOpenChange={setSidebarMobile}>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebarMobile;
