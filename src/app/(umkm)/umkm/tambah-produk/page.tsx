"use client";
import { useGetCategoryApiQuery } from "@/redux/feature/categorysSlice";
import { usePostProductsMutation } from "@/redux/feature/productsSlice";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
export interface Root {
  id: string;
  user_id: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  stock: string;
  discount: string;

  total: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  created_at: string;
  updated_at: string;
}
export default function TambahProdukPage() {
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<Root>();

  const [newDataProduct] = usePostProductsMutation();
  const [file, setFile] = useState<File>();

  const onSubmit: SubmitHandler<Root> = async (data) => {
    const dataa = new FormData();
    dataa.set("file", file!);
    const result = await fetch("/api/upload", {
      method: "POST",
      body: dataa,
    });
    console.log(result);
    console.log(file);
    setLoading(true);
    await newDataProduct({
      user_id: session?.user?.id,
      title: data.title,
      desc: data.desc,
      price: data.price,
      image: file?.name,
      stock: data.stock,
      discount: data.discount,
    }).then((res: any) => {
      setLoading(false);
      toast.success("Berhasil menambahkan produk baru");
    });
  };
  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          color="primary"
          variant="bordered"
          label="Nama Produk"
          size="sm"
          {...register("title", { required: true })}
        />
        <Input
          color="primary"
          variant="bordered"
          size="sm"
          label="Deskripsi Produk"
          {...register("desc", { required: true })}
        />
        <Input
          color="primary"
          variant="bordered"
          size="sm"
          label="Harga"
          {...register("price", { required: true })}
        />
        <Input
          color="primary"
          variant="bordered"
          size="sm"
          label="Jumlah Stok Barang"
          {...register("stock", { required: true })}
        />
        <Input
          color="primary"
          variant="bordered"
          size="sm"
          label="Discount"
          {...register("discount", { required: true })}
        />

        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <Button color="primary" isLoading={loading} fullWidth type="submit">
          Kirim
        </Button>
      </form>
    </>
  );
}
