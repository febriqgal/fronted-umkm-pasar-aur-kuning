"use client";
import { usePostUsersMutation } from "@/app/_redux/feature/usersSlice";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface IFormInput {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export default function SignupPage() {
  const route = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const [addNewUsers] = usePostUsersMutation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await addNewUsers({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: "user",
    }).then((res: any) => {
      if (res?.error?.status === 422) {
        setLoading(false);
        toast.error("Akun sudah terdaftar, silahkan login.");
      } else {
        setLoading(false);
        toast.success("Berhasil membuat akun, silahkan login.");
        route.replace("/login");
      }
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col shadow-2xl border p-20 rounded-xl"
      >
        <h1 className="text-center font-bold mb-4 text-2xl">Buat Akun</h1>
        <div className="space-y-1">
          <Input
            type="text"
            color="primary"
            variant="bordered"
            size="sm"
            label="Nama"
            {...register("name", { required: true })}
          />
          <Input
            type="email"
            color="primary"
            variant="bordered"
            size="sm"
            label="email"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            color="primary"
            variant="bordered"
            size="sm"
            label="password"
            {...register("password", { required: true })}
          />
          <Input
            type="number"
            color="primary"
            variant="bordered"
            size="sm"
            label="No. Handphone"
            {...register("phone", { required: true })}
          />
          <Input
            type="text"
            color="primary"
            variant="bordered"
            size="sm"
            placeholder="exp: kel, kec, kota/kab, prov."
            label="Alamat"
            {...register("address", { required: true })}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <Button isLoading={loading} type="submit" color="primary" fullWidth>
            Buat Akun
          </Button>
          <Button color="primary" as={Link} href="/signup-umkm" fullWidth>
            UMKM? Daftar!
          </Button>
        </div>
      </form>
    </div>
  );
}
