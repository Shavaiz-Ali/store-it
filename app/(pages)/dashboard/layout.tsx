import type { Metadata } from "next";
import DashboardHeader from "./(components)/header";
import Wrapper from "./(components)/wrapper";
import DashbaordSideBar from "./(components)/sidebar";

export const metadata: Metadata = {
  title: "Dashbaord",
  description: "Dashboard",
};

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper className="flex h-screen ">
      <DashbaordSideBar />
      <div className="w-full flex-1 flex flex-col">
        <DashboardHeader />
        <div className="h-[calc(100vh-150px)] w-full remove-scrollbar overflow-auto bg-[#f2f4f8] mb-7 rounded-[30px] md:px-9 md:py-10 px-5 py-7 md:mb-7 ">
          {children}
        </div>
      </div>
    </Wrapper>
  );
}
