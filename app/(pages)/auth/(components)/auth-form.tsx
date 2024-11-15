"use client";

import { createAccount } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormType, FormValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { string, z } from "zod";
import OtpForm from "./otp-form";

const AuthForm = (type: { type: FormType }) => {
  const [openOtpPopUp, setOtpPopUp] = useState(true);
  const formSchema = FormValidationSchema(type.type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("fullName", data?.fullName);
      if (type.type === "register") {
        console.log(data);
        const response = await createAccount(formData as FormData);
        // if(response)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          className="space-y-3 flex flex-col justify-start w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-[46px] leading-[56px] font-[family-name:var(--font-poppins-bold)] text-backgroundGrayLight font-[700]">
            {type.type === "login" ? "Login" : "Create Account"}
          </h1>
          {type.type === "register" ? (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full sm:w-[580px] h-[78px] rounded-[12px] p-[16px] space-y-[6px] shadow-md shadow-[#4247611A] border transition peer-focus-within:border-accentRed">
                    <FormLabel className="text-sm leading-[20px] font-[family-name:var(--font-poppins-regular)] text-backgroundGrayLight font-400">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        className="peer w-full border-none shadow-none p-0 placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-[20px] text-backgroundGrayDark font-[family-name:var(--font-poppins-semibold)] text-sm leading-5 focus:text-backgroundGrayLight focus:font-[600] focus:placeholder:font-[400] focus:placeholder:text-backgroundGrayDark"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            ""
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="w-full sm:w-[580px] h-[78px] rounded-[12px] p-[16px] space-y-[6px] shadow-md shadow-[#4247611A] border">
                  <FormLabel className="text-sm leading-[20px] font-[family-name:var(--font-poppins-regular)] text-backgroundGrayLight font-400">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className=" border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-[20px] text-backgroundGrayDark font-[family-name:var(--font-poppins-semibold)] text-sm leading-5 focus:text-backgroundGrayLight focus:font-[600] focus:placeholder:font-[400] focus:placeholder:text-backgroundGrayDark"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* submit form button */}
          <Button
            // type="submit"
            className="w-full sm:w-[580px] h-[66px] rounded-[41px] bg-primaryOrangeLight shadow-md shadow-[#4159D64D] text-[15px] leading-[20px] font-[600] text-center font-[family-name:var(--font-poppins-semibold)] hover:bg-primaryOrangeLight"
          >
            {type.type === "login" ? "Login" : "Create Account"}
          </Button>

          <div className="flex justify-center items-center gap-x-0.5 text-[14px] leading-[20px] font-[400] font-[family-name:var(--font-poppins-regular)] text-backgroundGrayLight">
            {type.type === "register" ? (
              <>
                <span>Already have an account?</span>
                <Link className="text-primaryOrangeLight" href={"/auth/login"}>
                  Login
                </Link>
              </>
            ) : (
              <>
                <span>Don&apos;t have an account?</span>
                <Link
                  className="text-primaryOrangeLight"
                  href={"/auth/register"}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </form>
      </FormProvider>
      {openOtpPopUp && <OtpForm email={""} />}
    </>
  );
};

export default AuthForm;
