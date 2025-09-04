import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

interface SignupForm {
  username: string;
  password: string;
  email: string;
  fullname: string;
}

const Signup = ({ setType }: { setType: React.Dispatch<React.SetStateAction<"login" | "signup" | "forget-password">> }) => {
  const {signup} = useAuth()
  const { register, handleSubmit} = useForm<SignupForm>();
  const onsubmit = async (data: SignupForm) => {
    signup(data)
  };
  return (
    <div className="w-3xl m-auto aspect-video grid grid-cols-2 rounded-md overflow-clip bg-background z-20">
      {/* Left side */}
      <div className="relative">
        <Image
          src="https://lh6.googleusercontent.com/zk-AOr1C0C9RIivZzOmzPI3hKF_q8Ft9PgqXUPqw8TZf35Ts5DmPXP_JoNUC61sT3tY3_6E3xgkDYO2b7nW2Pp0WGDiIYRa8sxxuaIc8fq_8ftP7q77OtsA8dccAjymUHe3DtDBRTiHuz4RG0HBhjudGAGimWD13BDBohmlubM7w0SndtnB3XV1mRqvdHA"
          alt="#"
          fill
          className="w-full h-full object-cover object-center absolute"
        />
        <div className="absolute w-full h-full bg-background/80 z-10" />
        <div className="absolute w-full h-full flex flex-col justify-center items-center z-20">
          <Image
            src="/images/platapus.png"
            alt="logo"
            width={200}
            height={100}
          />
          <span className="text-white text-3xl font-bold">QUẠC PHIM</span>
        </div>
      </div>
      {/* Right side */}
      <form onSubmit={handleSubmit(onsubmit)} className="p-12 flex flex-col gap-2 relative">
        <span className="text-lg">Đăng ký</span>
        {/* Fullname */}
        <Input
          placeholder="Họ và tên"
          {...register("fullname", { required: true })}
          className="bg-white text-background placeholder:text-muted"
        />
        {/* Email */}
        <Input
          placeholder="Email"
          {...register("email", { required: true })}
          className="bg-white text-background placeholder:text-muted"
        />
        {/* Username */}
        <Input
          placeholder="Tên đăng nhập"
          {...register("username", { required: true })}
          className="bg-white text-background placeholder:text-muted"
        />
        {/* password */}
        <Input
          type="password"
          placeholder="Mật khẩu"
          {...register("password", { required: true })}
          className="bg-white text-background placeholder:text-muted"
        />
        <Button className="w-full">Đăng ký</Button>
        <p className="text-sm text-muted">
          Bạn đã có tài khoản, xin mời
          <span
            className="text-accent hover:cursor-pointer hover:underline"
            onClick={() => {
              setType("login");
            }}
          >
            {" "}
            đăng nhập.
          </span>
        </p>
        <p
          className="text-accent text-sm hover:cursor-pointer hover:underline"
          onClick={() => {
            setType("forget-password");
          }}
        >
          Quên mật khẩu.
        </p>
      </form>
    </div>
  );
};

export default Signup;
