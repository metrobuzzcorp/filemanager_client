import { Button, Input } from "@/components";
import { useLoginUserMutation, useRegisterUserMutation } from "@/store/apis";
import { useAppDispatch } from "@/store/hooks";
import { updateUserData } from "@/store/slices";
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from "@/types";
import { isError } from "@/utils";
import { useFetcher } from "netwrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [triggerFetch] = useLoginUserMutation();

  const dispatch = useAppDispatch();

  const { trigger, isLoading } = useFetcher<
    LoginUserRequest,
    LoginUserResponse
  >({
    queryFn: (queryData) =>
      triggerFetch({
        emailAddress: queryData?.emailAddress as string,
        password: queryData?.password as string,
      }).unwrap(),
    onSuccess(data) {
      if (!data.status) {
        throw new Error(data.message);
      }

      toast.success("Successfully logged in!");
      setEmailAddress("");
      setPassword("");
      dispatch(updateUserData(data.payload));
      router.push("/");
    },
    onError(error) {
      if (isError(error)) {
        return toast.error(error.message);
      }

      const _error = error as { data: RegisterUserResponse };

      return toast.error(_error.data.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailAddress) {
      return toast.error("Email address is required");
    }

    if (!password) {
      return toast.error("Password is required");
    }

    trigger({
      emailAddress,
      password,
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Input
          required
          placeholder="Email Address"
          type="text"
          onChange={(e) => {
            setEmailAddress(e.target.value);
          }}
          value={emailAddress}
        />
        <div className="mt-4" />
        <Input
          required
          placeholder="Password"
          showPassword={showPassword}
          isPasswordInput
          type={!showPassword ? "password" : "text"}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <div className="flex justify-end mt-5">
          <Link href="/forgot-password" passHref>
            <p className="text-sm text-emerald-600">Forgot Password?</p>
          </Link>
        </div>
        <div className="mt-5">
          <Button isLoading={isLoading}>Login</Button>
        </div>
      </form>
    </div>
  );
};
