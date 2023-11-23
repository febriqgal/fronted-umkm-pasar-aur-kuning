/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  cn,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { SyntheticEvent, use, useState } from "react";
import StickyBox from "react-sticky-box";
import { Carts } from "../../_types/cart";
import axios from "axios";
import toast from "react-hot-toast";
import ModalEditProfile from "../../_components/M/modalEditProfile";
import Link from "next/link";
import { useGetUserByIdApiQuery } from "@/app/_redux/feature/usersSlice";
import { appConfig, formatRupiah } from "@/app/_constant/appConfig";
import {
  useDeleteCartsMutation,
  useGetByUserIdCartsApiQuery,
  useGetByidCartsApiQuery,
} from "@/app/_redux/feature/cartsSlice";

export default function CartPage() {
  const dataOngkir = [
    {
      tipe: "Luar Kota",
      value: 30000,
    },
    {
      tipe: "Dalam Kota",
      value: 20000,
    },
    {
      tipe: "Luar Pulau",
      value: 60000,
    },
  ];
  const [isSelected, setIsSelected] = React.useState(false);
  const [ongkir, setOngkir]: any = React.useState(0);
  const [disable, setDisable] = useState(false);
  const [groupSelected, setGroupSelected]: any = React.useState<Carts[]>([]);
  const { data: session } = useSession();
  const { data: dataCart } = useGetByUserIdCartsApiQuery(session?.user.id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: dataUsers } = useGetUserByIdApiQuery(session?.user.email, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCarts] = useDeleteCartsMutation();
  console.log(dataUsers);
  console.log(groupSelected[0]);
  const { data: dataCartSelected } = useGetByidCartsApiQuery(groupSelected[0], {
    refetchOnMountOrArgChange: true,
  });
  console.log(dataCartSelected?.data);

  const handleNewOrders = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    await axios
      .post(`${appConfig.appApiUrl}/orders`, {
        user_id: `${dataUsers?.data?.id}`,
        product_id: `${dataCartSelected?.data.product_id}`,
        cart_id: `${dataCartSelected?.data.id}`,
        status: "pending",
        total:
          Number(dataCartSelected?.data.total) + Number(ongkir.anchorKey)
            ? Number(dataCartSelected?.data.total) + Number(ongkir.anchorKey)
            : Number(dataCartSelected?.data.total),
      })
      .then((res) => {
        console.log(res);
      });

    // await deleteCarts(e.id);

    toast.success("Berhasil checkout, silahkan lakukan pembayaran");
    setDisable(false);
    setGroupSelected([]);
  };

  return (
    <div className="space-y-4 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold">Keranjang 🛒</h1>
      <form onSubmit={handleNewOrders} className="w-full space-y-4">
        {disable === false ? (
          <h1>Silahkan Pilih salah satu yang mau di checkout</h1>
        ) : (
          <Button
            color="primary"
            onPress={() => {
              setGroupSelected([]);
              if (disable === true) {
                setDisable(false);
              }
            }}
          >
            Batalkan
          </Button>
        )}
        <div className="flex  justify-between">
          <CheckboxGroup
            isRequired
            value={groupSelected}
            onChange={setGroupSelected}
            classNames={{
              base: "w-full",
            }}
            className="w-full"
          >
            {dataCart?.data?.map((e: Carts) => {
              console.log(e);
              console.log(isSelected);

              return (
                <Checkbox
                  onChange={() => {
                    setDisable(!disable);
                  }}
                  isDisabled={disable}
                  key={e.id}
                  value={e.id}
                  className="w-full"
                  classNames={{
                    base: cn(
                      "inline-flex  w-full bg-content1 m-0",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  <div className="flex justify-between overflow-clip w-[500px] gap-4 items-center">
                    <div className="flex gap-4 items-center justify-center overflow-clip">
                      <img
                        src={`http://localhost:3000/product/${e.product?.image}`}
                        alt="#"
                        className=" h-20 object-scale-down aspect-video rounded-xl"
                      />
                      <div className="flex flex-col gap-4">
                        <div>
                          <h1 className="text-sm line-clamp-1 font-bold">
                            {e.product?.title}
                          </h1>
                          <h1 className="text-xs line-clamp-1">
                            {e.product?.desc}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-sm line-clamp-1">
                            Dibeli: {e.quantity}
                          </h1>
                          <h1 className="text-sm line-clamp-1">
                            catatan: {e.note}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <h1 className="text-sm">{formatRupiah(e.total)}</h1>
                      <Button onPress={() => deleteCarts(e.id)}>Hapus</Button>
                    </div>
                  </div>
                </Checkbox>
              );
            })}
          </CheckboxGroup>
          <StickyBox
            offsetTop={104}
            offsetBottom={20}
            className="flex gap-5 p-10  h-fit  left-0 w-[500px] shadow-xl justify-center items-center flex-col  border rounded-xl"
          >
            <div className="w-full flex gap-4 justify-center flex-col items-center h-fit">
              <Select
                value={ongkir}
                onSelectionChange={setOngkir}
                label="Pengiriman"
                placeholder="Pilih Pengiriman"
                isRequired
              >
                {dataOngkir.map((e) => {
                  return (
                    <SelectItem
                      key={e.value}
                      value={e.value}
                      className="w-full"
                    >
                      {e.tipe}
                    </SelectItem>
                  );
                })}
              </Select>

              <h1>{dataUsers?.data?.address}</h1>
              <Button as={Link} href="/user/kelola-akun">
                Edit Alamat
              </Button>
              <div className="w-full">
                <h1 className="text-center mb-4 font-bold">Subtotal</h1>
                <div className="flex justify-between w-full">
                  <h1>Ongkir</h1>
                  <h1>{formatRupiah(ongkir.anchorKey ?? 0)}</h1>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Produk</h1>
                  <h1>{formatRupiah(dataCartSelected?.data?.total ?? 0)}</h1>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Total</h1>
                  <h1 className="">
                    {formatRupiah(
                      dataCartSelected?.data?.total ??
                        0 + Number(ongkir.anchorKey ?? 0)
                    )
                      ? formatRupiah(
                          dataCartSelected?.data?.total ??
                            0 + Number(ongkir.anchorKey ?? 0)
                        )
                      : formatRupiah(dataCartSelected?.data?.total ?? 0)}
                  </h1>
                </div>
              </div>
            </div>
            <Button
              onPress={() => {
                groupSelected.length === 0
                  ? toast.error("Pilih produk terlebih dahulu")
                  : null;
              }}
              fullWidth
              type="submit"
              color="primary"
            >
              Checkout
            </Button>
          </StickyBox>
        </div>
      </form>
    </div>
  );
}
