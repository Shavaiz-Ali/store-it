/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { FormType, FormValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import OtpForm from "./otp-form";
import { sendOTP } from "@/actions/nodemailer";
import { verifyOTP } from "@/actions/auth/otp-verify";
import { useRouter } from "next/navigation";
// import FormApiMessage from "./form-message";
import { toast } from "@/hooks/use-toast";
import { Login } from "@/actions/auth/login";
import Typography from "./typography";

const AuthForm = (type: { type: FormType }) => {
  const [openOtpPopUp, setOtpPopUp] = useState(false);
  const formSchema = FormValidationSchema(type.type);
  const [loading, setLoading] = useState(false);
  const [userOTP, setUserOTP] = React.useState<string>("");
  const [formData, setFormData] = useState<FormData | undefined>(undefined);
  const [otp, setOTP] = useState<number | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleApiResponseMessages = (message: string, status: number) => {
    console.log(message, status);
    switch (status) {
      case 200:
        toast({
          variant: "success",
          title: "Success",
          description: `${
            message ? message : "Something went wrong. Please try again"
          }`,
        });
        break;
      case 201:
        toast({
          variant: "success",
          title: "Success",
          description: `${
            message ? message : "Something went wrong. Please try again"
          }`,
        });
        break;
      case 400:
        toast({
          variant: "destructive",
          title: "Failure",
          description: `${
            message ? message : "Something went wrong. Please try again"
          }`,
        });
        break;
      case 401:
        toast({
          variant: "destructive",
          title: "Failure",
          description: `${
            message ? message : "Something went wrong. Please try again"
          }`,
        });
        break;
      case 409:
        toast({
          variant: "destructive",
          title: "Failure",
          description: `${
            message ? message : "Something went wrong. Please try again"
          }`,
        });
        break;
      case 500:
        toast({
          variant: "destructive",
          title: "Failure",
          description: `${
            message ? message : "Something went wrong. Please try again"
          }`,
        });
        break;

      default:
        break;
    }
  };

  //creating user after otp verfication
  const handleCreateUser = async () => {
    if (!otp || !userOTP) return;
    setLoading(true);
    try {
      const otpVerify = await verifyOTP({
        token: otp as number,
        userOTP: userOTP as string,
      });
      handleApiResponseMessages(
        otpVerify?.message as string,
        otpVerify?.status as number
      );
      setTimeout(async () => {
        if (otpVerify?.status === 200) {
          setUserOTP("");
          setOtpPopUp(false);
          setLoading(false);
          const createUser = await createAccount(formData as FormData);
          handleApiResponseMessages(
            createUser?.message as string,
            createUser?.status as number
          );
          if (createUser?.status === 201) {
            router.push("/auth/login");
          }
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("fullName", data?.fullName as string);
      formData.append("password", data?.password as string);
      setFormData(formData);
      if (type.type === "register") {
        setLoading(true);
        const otpSend = await sendOTP(formData as FormData);
        console.log(otpSend);
        handleApiResponseMessages(
          otpSend?.message as string,
          otpSend?.status as number
        );
        if (otpSend?.status === 200) {
          setLoading(false);
          setOTP(otpSend?.otp as number);
          setOtpPopUp(true);
        }
      } else {
        setLoading(true);
        const login = await Login(formData as FormData);
        handleApiResponseMessages(
          login?.message as string,
          login?.status as number
        );
        if (login?.status === 200) {
          setLoading(false);
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setLoading(false);
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
          <Typography
            variant="h1"
            className="text-[46px] leading-[56px] text-backgroundGrayLight"
          >
            {type.type === "login" ? "Login" : "Create Account"}
          </Typography>
          {type.type === "register" ? (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full sm:w-[580px] h-[78px] rounded-[12px] p-[16px] space-y-[6px] shadow-md shadow-[#4247611A] border transition peer-focus-within:border-accentRed">
                    <FormLabel>
                      <Typography variant="h5" className="">
                        Full Name
                      </Typography>
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
                  <FormLabel>
                    <Typography variant="h5" className="">
                      Email
                    </Typography>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="w-full sm:w-[580px] h-[78px] rounded-[12px] p-[16px] space-y-[6px] shadow-md shadow-[#4247611A] border">
                  <FormLabel>
                    <Typography variant="h5" className="">
                      Password
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
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
            type="submit"
            className="w-full sm:w-[580px] h-[66px] rounded-[41px] bg-primaryOrangeLight shadow-md shadow-[#4159D64D]  hover:bg-primaryOrangeLight"
            disabled={loading}
          >
            {loading && (
              <div className="flex justify-center items-center gap-x-2">
                <div className="h-4 w-4 rounded-full border border-white border-t-backgroundGrayLight animate-spin" />
              </div>
            )}
            <Typography variant="button" className="text-[#ffffff]">
              {type.type === "login" ? "Login" : "Create Account"}
            </Typography>
          </Button>

          <div className="flex justify-center items-center gap-x-0.5">
            <Typography variant="h5">
              {type.type === "register" ? (
                <>
                  <span>Already have an account?</span>{" "}
                  <Link
                    className="text-primaryOrangeLight"
                    href={"/auth/login"}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <span>Don&apos;t have an account?</span>{" "}
                  <Link
                    className="text-primaryOrangeLight"
                    href={"/auth/register"}
                  >
                    Create account
                  </Link>
                </>
              )}
            </Typography>
          </div>
        </form>
      </FormProvider>
      {openOtpPopUp && (
        <OtpForm
          email={""}
          setUserOTP={setUserOTP}
          userOTP={userOTP}
          handleCreateUser={handleCreateUser}
          loading={loading}
        />
      )}
    </>
  );
};

export default AuthForm;
