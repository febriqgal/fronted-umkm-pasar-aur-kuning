"use client";
import { User } from "@/app/(admin)/_types/user";
import { useGetUserByIdApiQuery } from "@/redux/feature/usersSlice";
import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function UserPage() {
  const { data: session } = useSession();
  console.log(session?.user.id);

  const { data: dataUser, isLoading } = useGetUserByIdApiQuery(
    session?.user.email
  );
  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    await axios
      .patch(`http://127.0.0.1:8000/api/users/${session?.user.id}`, data)
      .then((res) => {
        console.log(res);
      });
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
