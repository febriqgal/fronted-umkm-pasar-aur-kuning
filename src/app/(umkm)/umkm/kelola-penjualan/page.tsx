/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { appConfig, formatRupiah } from "@/app/_constant/appConfig";
import { useGetByidOrdersApiQuery } from "@/app/_redux/feature/ordersSlice";
import { Order } from "@/app/_types/order";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Pdf from "./cetak";
export default function RiwayatPage() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { data: session } = useSession();

  const { data: dataOrders } = useGetByidOrdersApiQuery(session?.user?.id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="flex flex-col min-h-screen">
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
                <TableCell>{formatRupiah(e.total)}</TableCell>
                <TableCell>{e.user.address}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell className="text-center">
                  {e.payment ? (
                    <Button
                      color="primary"
                      as={Link}
                      href={`${appConfig.appUrl}/product/${e.payment}`}
                    >
                      Lihat
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell
                  title={dayjs(e.created_at).format("hh:mm - DD MMM YYYY")}
                >
                  {dayjs(e.created_at).fromNow()}
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">{e.status}</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${appConfig.appApiUrl}/orders/${e.id}`,
                            {
                              status: "pending",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Pending
                      </DropdownItem>
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${appConfig.appApiUrl}/orders/${e.id}`,
                            {
                              status: "delivered",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Delivered
                      </DropdownItem>
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${appConfig.appApiUrl}/orders/${e.id}`,
                            {
                              status: "cancelled",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Cancelled
                      </DropdownItem>
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${appConfig.appApiUrl}/orders/${e.id}`,
                            {
                              status: "success",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Success
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pdf />
    </div>
  );
}
