"use client";
import { appConfig } from "@/app/_constant/appConfig";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
  email: string;
  password: string;
}
export default function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await axios.get(`${appConfig.appApiUrl}/users/${data.email}`);

    if (
      res?.data?.data === null ||
      res.data?.data?.password !== data.password
    ) {
      toast.error("Email atau password salah");
    }
    if (res?.data?.data?.password === data.password) {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col shadow-2xl border p-20 rounded-xl"
      >
        <h1 className="text-center font-bold mb-4 text-2xl">Masuk</h1>
        <div className="space-y-1">
          <Input
            type="email"
            color="primary"
            variant="bordered"
            size="sm"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            color="primary"
            variant="bordered"
            size="sm"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <Button type="submit" color="primary" fullWidth>
            Masuk
          </Button>
          <Button
            color="primary"
            variant="bordered"
            as={Link}
            href="/signup"
            fullWidth
          >
            Buat Akun
          </Button>
        </div>
      </form>
    </div>
  );
}
