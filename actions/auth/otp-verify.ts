export const verifyOTP = async ({
  otp,
  userOTP,
}: {
  otp: number;
  userOTP: string;
}) => {
  if (!otp || !userOTP) {
    return {
      success: false,
      message: "otp is required!",
      status: 400,
    };
  }

  if (otp.toString().trim() === userOTP.toString().trim()) {
    return {
      success: true,
      message: "otp verified successfully!",
      status: 200,
    };
  }
};
