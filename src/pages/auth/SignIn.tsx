import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import OTPVerifyForm from "./OTPVerifyForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, AuthSchema } from "../../schemas";
import AccessCodeForm from "./AccessCodeForm";

export type AuthenType = "send_phone" | "submit_otpcode";

const SignIn = () => {
  const [authenType, setAuthenType] = useState<AuthenType>("send_phone");

  const handleNextTabs = async () => {
    if (authenType === "send_phone") {
      setAuthenType("submit_otpcode");
    } else {
      setAuthenType("send_phone");
    }
  };

  const methods = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      phoneNumber: "",
      accessCode: "",
    },
    mode: "onSubmit",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  // const handleNextTabs = async () => {
  //   if (authenType === "send_phone") {
  //     const isValid = await methods.trigger(["phoneNumber"]);
  //     if (!isValid) return;
  //     setAuthenType("submit_otpcode");
  //   } else if (authenType === "submit_otpcode") {
  //     const isValid = await methods.trigger(["phoneNumber", "accessCode"]);
  //     if (!isValid) return;
  //   }
  // };

  // const handleTabClick = async (nextKey: AuthenType) => {
  //   const tabOrder: AuthenType[] = ["send_phone", "submit_otpcode"];
  //   const currentIndex = tabOrder.indexOf(authenType);
  //   const nextIndex = tabOrder.indexOf(nextKey);

  //   if (nextIndex > currentIndex) {
  //     await handleNextTabs();
  //   } else {
  //     setAuthenType(nextKey);
  //   }
  // };

  return (
    <>
      <Container className="" style={{ width: "35%" }}>
        <div className="border rounded-3 px-4 py-3 text-center">
          <h6
            className="d-flex align-items-center"
            onClick={() => handleNextTabs()}
          >
            <i className="bi bi-arrow-left fs-4"></i>{" "}
            <span className="ms-2">Back</span>
          </h6>
          <FormProvider {...methods}>
            {authenType === "send_phone" && <AccessCodeForm />}
            {authenType === "submit_otpcode" && <OTPVerifyForm />}
          </FormProvider>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
