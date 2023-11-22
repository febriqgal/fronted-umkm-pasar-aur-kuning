"use client";
import { useGetByUserIdProductsApiQuery } from "@/redux/feature/productsSlice";
import { Product } from "@/types/products";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ModalEditProduct from "../../_components/modal/editProduct";
import ModalDeleteProduct from "../../_components/modal/deleteProduct";
import ModalAddProduct from "../../_components/modal/addProduct";

export default function KelolaProdukPage() {
  const { data: session } = useSession();
  console.log(session?.user?.id);
  const { data: dataProduct } = useGetByUserIdProductsApiQuery(
    `${session?.user?.id}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log(dataProduct?.data);

  return (
    <div className="w-full py-10 px-20">
      <ModalAddProduct />
      <Table
        color="primary"
        className="w-full "
        fullWidth
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Nama Barang</TableColumn>
          <TableColumn>Deskripsi Barang</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Stok</TableColumn>
          <TableColumn>Diskon</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {dataProduct?.data.map((e: Product, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.desc}</TableCell>
                <TableCell>{e.price}</TableCell>
                <TableCell>{e.stock}</TableCell>
                <TableCell>{e.discount}</TableCell>
                <TableCell>{e.total}</TableCell>
                <TableCell className="flex gap-2">
                  <Button color="primary" as={Link} href={`/product/${e.id}`}>
                    Lihat
                  </Button>
                  <ModalDeleteProduct dataProduct={e} />
                  <ModalEditProduct dataProduct={e} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
