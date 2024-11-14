import React from "react";
import AuthForm from "../(components)/auth-form";

export default function LoginPage() {
  return (
    <div className="sm:w-auto w-full">
      <AuthForm type="login" />
    </div>
  );
}
