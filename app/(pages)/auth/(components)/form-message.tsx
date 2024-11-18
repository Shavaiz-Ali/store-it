import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { TiTick } from "react-icons/ti";
// import {success}
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FormApiMessage = ({
  message,
  messageType,
}: {
  message: string;
  messageType: string | undefined;
}) => {
  return (
    <Alert
      className="mt-3 w-[300px]"
      variant={messageType as "default" | "destructive" | undefined}
    >
      {messageType === "destructive" ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : (
        <TiTick className="h-6 w-6" />
      )}
      <AlertTitle>
        {messageType === "destructive" ? "Error" : "Success"}
      </AlertTitle>
      <AlertDescription className="text-wrap">
        <p className="text-wrap">{message || "Something went wrong"}</p>
      </AlertDescription>
    </Alert>
  );
};

export default FormApiMessage;
