import React from "react";

const AuthForm = (type: { type: string }) => {
  return (
    <div>
      {type.type === "register" ? (
        <div>Register Form</div>
      ) : (
        <div>Login Form</div>
      )}
    </div>
  );
};

export default AuthForm;
