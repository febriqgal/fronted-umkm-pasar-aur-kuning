/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { appConfig, formatRupiah } from "@/constant/appConfig";
import {
  useDeleteOrdersMutation,
  useGetByidOrdersApiQuery,
} from "@/redux/feature/ordersSlice";
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
import ModalBayar from "./components/modalBayar";
import { Order } from "./types/order";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
export default function RiwayatPage() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { data: session } = useSession();
  const [deleteOrder] = useDeleteOrdersMutation();
  const { data: dataOrders } = useGetByidOrdersApiQuery(session?.user?.id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(dataOrders?.data);

  return (
    <div className="flex  mt-20  min-h-screen">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>Catatan</TableColumn>
          <TableColumn>QTY</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>Bukti Pembayaran</TableColumn>
          <TableColumn>Tanggal</TableColumn>
          <TableColumn>{""}</TableColumn>
        </TableHeader>
        <TableBody>
          {dataOrders?.data?.map((e: Order, i: number) => {
            console.log(e);
            return (
              <TableRow key={e.id}>
                <TableCell>{i + 1}.</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <img
                      className="aspect-video h-10 rounded-xl"
                      src={`${appConfig.appUrl}/product/${e.product.image}`}
                    />
                    <h1>{e.product.title}</h1>
                  </div>
                </TableCell>
                <TableCell>{e.cart.note}</TableCell>
                <TableCell>{e.cart.quantity}</TableCell>
                <TableCell>{formatRupiah(e.cart.total)}</TableCell>
                <TableCell>{e.user.address}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>
                  {e.payment ? (
                    <Button
                      color="primary"
                      as={Link}
                      href={`${appConfig.appUrl}/product/${e.payment}`}
                    >
                      Lihat
                    </Button>
                  ) : null}
                </TableCell>
                <TableCell
                  title={dayjs(e.created_at).format("hh:mm - DD MMM YYYY")}
                >
                  {dayjs(e.created_at).fromNow()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <ModalBayar dataOrders={e} />
                    {e.status === "success" ? (
                      <Button onPress={() => deleteOrder(e.id)}>Hapus</Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
