import { Poppins } from "next/font/google";

// Define the necessary font weights only once
export const poppinsBold = Poppins({
  weight: "700",
  variable: "--font-poppins-bold",
  subsets: ["latin"],
});

export const poppinsSemiBold = Poppins({
  weight: "600",
  variable: "--font-poppins-semibold",
  subsets: ["latin"],
});

export const poppinsMedium = Poppins({
  weight: "500",
  variable: "--font-poppins-medium",
  subsets: ["latin"],
});

export const poppinsRegular = Poppins({
  weight: "400",
  variable: "--font-poppins-regular",
  subsets: ["latin"],
});
