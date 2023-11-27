"use client";

import { useGetByUserIdProductsApiQuery } from "@/app/_redux/feature/productsSlice";
import { Product } from "@/app/_types/products";
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
import ModalDeleteProduct from "../../../_components/ModalDeleteProduct";
import ModalEditProduct from "../../../_components/ModalEditProduct";

export default function KelolaProdukPage() {
  const { data: session } = useSession();
  const { data: dataProduct } = useGetByUserIdProductsApiQuery(
    `${session?.user?.id}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="w-full">
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
