"use client";
import { useGetUserByIdApiQuery } from "@/app/_redux/feature/usersSlice";
import { User } from "@/app/_types/user";
import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function KelolaAkunPage() {
  const { data: session } = useSession();

  const { data: dataUser, isLoading } = useGetUserByIdApiQuery(
    session?.user.email
  );
  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    await axios
      .patch(`http://127.0.0.1:8000/api/users/${session?.user.id}`, data)
      .then((res) => {});
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          type="text"
          label="Nama"
          defaultValue={dataUser?.data?.name}
          {...register("name")}
        />
        <Input
          type="email"
          isDisabled
          label="Email"
          defaultValue={dataUser?.data?.email}
          {...register("email")}
        />
        <Input
          type="number"
          label="No. Hp"
          defaultValue={dataUser?.data?.phone}
          {...register("phone")}
        />
        <Input
          type="text"
          label="Alamat"
          defaultValue={dataUser?.data?.address}
          {...register("address")}
        />

        <Button type="submit" color="primary" fullWidth>
          Kirim
        </Button>
      </form>
    </div>
  );
}
