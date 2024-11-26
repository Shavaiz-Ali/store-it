import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-white z-[99999999999] flex justify-center items-center">
      <div className="h-10 w-10 rounded-full border-[3px] border-backgroundGrayLight border-t-primaryOrangeLight animate-spin" />
    </div>
  );
};

export default Loader;
