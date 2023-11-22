"use client";
import { appConfig } from "@/constant/appConfig";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
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
export default function SignupUMKMPage() {
  const route = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const findUser = await axios.get(
      `${appConfig.appApiUrl}/users/${data.email}`
    );
    console.log(findUser);
    if (findUser.data.data) {
      toast.error("Akun sudah terdaftar, silahkan login");
      setLoading(false);
      return;
    }
    await axios
      .post(`http://127.0.0.1:8000/api/users`, {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone,
        role: "umkm",
      })
      .then((res) => {
        setLoading(false);
        toast.success("Berhasil membuat akun, silahkan login");
        route.replace("/login");
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col shadow-2xl border   p-20 rounded-xl"
      >
        <h1 className="text-center font-bold mb-4 text-2xl">Buat Toko</h1>
        <div className="space-y-1">
          <Input
            type="text"
            color="primary"
            variant="bordered"
            size="sm"
            placeholder="Nama Toko"
            {...register("name", { required: true })}
          />
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
            {...register("password", { required: true })}
          />
          <Input
            type="number"
            color="primary"
            variant="bordered"
            size="sm"
            placeholder="No. Handphone"
            {...register("phone", { required: true })}
          />
          <Input
            color="primary"
            variant="bordered"
            size="sm"
            placeholder="exp: kel, kec, kota/kab, prov."
            label="Alamat"
            {...register("address", { required: true })}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <Button type="submit" color="primary" fullWidth>
            Buat Toko
          </Button>
        </div>
      </form>
    </div>
  );
}
