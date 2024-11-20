import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={`px-[6px] xs:px-[10px] sm:px-[16px] md:px-[26px] lg:px-[36px] mx-auto  ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
