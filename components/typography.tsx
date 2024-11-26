import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "button";
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  className,
  children,
}) => {
  const baseClasses = "text-backgroundGrayLight"; // Base classes for all typography elements
  const variants = {
    h1: `${baseClasses} font-[family-name:var(--font-poppins-bold)] text-[32px] leading-[42px] font-bold`,
    h2: `${baseClasses} font-[family-name:var(--font-poppins-semibold)] text-[24px] leading-[36px]  font-semibold`,
    h3: `${baseClasses} font-[family-name:var(--font-poppins-medium)] text-[20px] leading-7  font-medium`,
    h4: `${baseClasses} font-[family-name:var(--font-poppins-regular)] text-[18px] leading-[24px]  font-[400]`,
    h5: `${baseClasses} font-[family-name:var(--font-poppins-regular)] text-[14px] leading-[20px]  font-[400]`,
    p: `${baseClasses} font-[family-name:var(--font-poppins-regular)]  text-[14px] leading-[16px] font-[400]`,
    button: `${baseClasses} font-[family-name:var(--font-poppins-semibold)] text-[14px] leading-[20px] font-semibold`,
  };

  const Tag = variant; // Use the variant as the tag name

  return (
    <Tag className={cn(`${variants[variant]}`, className)}>{children}</Tag>
  );
};

export default Typography;
