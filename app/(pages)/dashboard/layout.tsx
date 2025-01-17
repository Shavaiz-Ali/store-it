import type { Metadata } from "next";
import DashboardHeader from "./(components)/(global-cmps)/header";
import Wrapper from "./(components)/(global-cmps)/wrapper";
import DashbaordSideBar from "./(components)/(global-cmps)/sidebar";
import { loggedInUser } from "@/actions/auth/me";
// import { AuthContextProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export const dynamic = "force-dynamic";

// export async function generateMetadata({ pathName }) {
//   console.log(pathName);
// }

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await loggedInUser();
  return (
    <Wrapper className="flex h-screen sm:space-x-3">
      <div className="hidden sm:flex remove-scrollbar w-[70px] lg:w-[280px] xl:w-[325px] pt-[30px] pb-[30px] h-full">
        <DashbaordSideBar user={user} />
      </div>
      <div className="w-full flex-1 flex flex-col">
        <DashboardHeader />
        <div className="relative h-[calc(100vh-150px)] w-full remove-scrollbar overflow-auto bg-[#f2f4f8] mb-7 rounded-[30px] px-3 py-5 sm:px-9 sm:py-10 xs:px-5 xs:py-7 md:mb-7 ">
          {children}
        </div>
      </div>
    </Wrapper>
  );
}
