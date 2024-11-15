/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const OtpForm = ({ email }: any) => {
  const [value, setValue] = React.useState<string>("");
  console.log(value);
  return (
    <div className="fixed top-0 left-0 min-h-screen w-full bg-[#333F4E]/20 flex justify-center items-center">
      <div className="w-[95%] h-[360px] sm:w-[550px] bg-white flex flex-col gap-[6px] justify-center items-center rounded-[20px] py-[40px] px-[20px] sm:px-[36px]">
        <h1 className="text-[24px] font-[700] leading-[36px] font-[family-name:var(--font-poppins-bold)] text-backgroundGrayLight text-center">
          Enter OTP
        </h1>
        <p className="text-sm font-[400] leading-[20px] font-[family-name:var(--font-poppins-regular)] text-backgroundGrayLight text-center">
          We&apos;ve sent a code to {email}
        </p>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value: string) => setValue(value)}
          className="w-full"
        >
          <InputOTPGroup className="sm:space-x-4 space-x-2 rounded-none  my-3 w-full">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <InputOTPSlot
                  key={index}
                  className={cn(
                    "group w-[45px] h-[55px] xs:w-[55px] xs:h-[65px] sm:h-[80px] sm:w-[70px] rounded-[12px] shadow-lg border border-[#4247611A]/15 shadow-[#4247611A] text-[48px] font-[400] font-[family-name:var(--font-poppins-medium)] text-[#F2F5F9] py-[10px] px-2",
                    {
                      "text-primaryOrangeLight ring-2 ring-primaryOrangeLight":
                        value.trim().length > 0,
                    }
                  )}
                  index={index}
                />
              ))}
          </InputOTPGroup>
        </InputOTP>
        <Button className="h-[50px] w-full bg-primaryOrangeLight py-[10px] px-[18px] shadow-lg shadow-[#4159D64D] rounded-[41px] font-[600] leading-[20px] font-[family-name:var(--font-poppins-semibold)] text-[15px] hover:bg-primaryOrangeLight">
          Submit
        </Button>
        <div className="mt-3">
          <p className="text-[20px] font-[400] font-[family-name:var(--font-poppins-regular)] leading-[20px] text-backgroundGrayLight text-center text-wrap">
            Didn’t get a code?{" "}
            <span className="text-primaryOrangeLight cursor-pointer">
              Click to resend.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
