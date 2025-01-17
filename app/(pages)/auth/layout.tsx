import CommonLayout from "./(components)/common-layout";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-x-2 min-h-screen w-full sm:p-0 px-4">
      <CommonLayout />
      <div className="w-full h-screen flex flex-col lg:gap-0 gap-4 justify-center items-center ">
        <div className="lg:hidden">
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={82}
            width={224}
            className="h-auto"
          />
        </div>
        {children}
      </div>
      <NextTopLoader color="#FA7275" showSpinner={false} />
    </div>
  );
}
