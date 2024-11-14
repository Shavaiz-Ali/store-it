import type { Metadata } from "next";
import CommonLayout from "./(components)/common-layout";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-x-2 min-h-screen w-full">
      <CommonLayout />
      <div className="w-full h-screen flex flex-col lg:gap-0 gap-4 justify-center items-center ">
        <div className="lg:hidden">
          <div className="flex items-center gap-x-2">
            <p className="text-[37px] font-[family-name:var(--font-poppins-medium)] leading-[56px] text-primaryOrangeDark font-[400]">
              Storeit
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
