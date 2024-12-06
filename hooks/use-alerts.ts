"use client";

import { useToast } from "./use-toast";

export const useAlertMessages = () => {
  const { toast } = useToast();

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

  return { handleApiResponseMessages };
};
