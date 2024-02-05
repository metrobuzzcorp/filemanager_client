import Link from "next/link";
import { LoginForm } from "./loginForm";

export const Login = () => {
  return (
    <div className="flex flex-wrap h-screen">
      <div className="lg:w-5/12 w-full bg-gray-100 flex flex-col items-center pt-16 relative">
        <div className="flex flex-col items-center w-8/12">
          <h1 className="text-center text-5xl font-black text-neutral-700">
            Welcome back!
          </h1>
          <p className="font-normal text-center text-neutral-600 mt-5">
            Manage your files from any of the available methods for file
            management with <b>FileManager App</b>. Login and get started
          </p>
        </div>
        <div className="mt-16 w-full px-20">
          <LoginForm />
        </div>
        <div className="flex absolute bottom-10">
          <p>Not a member?</p>
          <Link href="/signup" passHref>
            <p className="text-emerald-600 ml-2">Register</p>
          </Link>
        </div>
      </div>
      <div className="lg:flex hidden w-7/12 bg-gray-100 justify-center items-center p-5">
        <div className="bg-[#f0f9d879] h-full w-full flex justify-center items-center rounded-lg"></div>
      </div>
    </div>
  );
};
