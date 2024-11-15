/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/models/auth/user";
import { sendEmail } from "@/utils";

export const createAccount = async (formdata: FormData) => {
  try {
    const fullName = formdata.get("fullName");
    const email = formdata.get("email");

    console.log(fullName, email);

    if (!email || !fullName) {
      return {
        success: false,
        message: "All fields are required",
        status: 400,
      };
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
        status: 400,
      };
    }

    const mail = await sendEmail({
      sender: {
        name: "Store it",
        address: "storeit@example.com",
      },
      receipients: [{ name: "John Doe", address: email as string }],
      subject: "Email verification email",
      message: "8888586",
    });

    console.log("mail send check");

    if (mail.accepted) {
      return {
        success: false,
        message: "Email send successfully",
        status: 400,
      };
    }
    const user = new User({
      fullName,
      email,
    });

    await user.save();
    if (!user) {
      return {
        success: false,
        message: "Error creating user",
        status: 500,
      };
    }

    return {
      success: true,
      message: "User created successfully",
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
