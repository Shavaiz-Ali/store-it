import type { Metadata } from "next";
import DashboardHeader from "./(components)/header";

export const metadata: Metadata = {
  title: "Dashbaord",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full px-[36px]">
      <DashboardHeader />
      {children}
    </div>
  );
}
