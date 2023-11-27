/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { SyntheticEvent, useEffect, useState } from "react";

import StickyBox from "react-sticky-box";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useGetByidProductsApiQuery } from "@/app/_redux/feature/productsSlice";
import { appConfig, formatRupiah } from "@/app/_constant/appConfig";
import { usePostCartsMutation } from "@/app/_redux/feature/cartsSlice";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: sesssion } = useSession();
  const [note, setNote] = useState("");
  const [newCart] = usePostCartsMutation();
  const { data: dataProduct, isLoading } = useGetByidProductsApiQuery(
    `${params.id}`
  );
  const [price, setPrice] = useState(0);
  const [count, setCounter] = useState(1);

  const data = dataProduct?.data;
  useEffect(() => {
    setPrice(dataProduct?.data.total);
  }, [dataProduct?.data.total]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  const handleCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!sesssion) {
      toast.error("Silahkan login terlebih dahulu");
      return;
    }
    await newCart({
      user_id: `${sesssion?.user?.id}`,
      note: note,
      product_id: `${data?.id}`,
      quantity: Number(count),
      total: Number(price),
    }).then((res: any) => {});
    toast.success("Berhasil ditambahkan ke keranjang");
  };

  return (
    <>
      <div className="flex flex-col justify-center shadow-2xl items-center min-h-screen bg-primary-800 p-20 rounded-b-full">
        <div className="bg-white p-20 rounded-3xl shadow-2xl">
          <div className="flex flex-row gap-5 ">
            <div className="grid grid-cols-2   w-full gap-5">
              <div className="bg-primary-900 rounded-xl overflow-clip h-full w-full flex justify-center items-center">
                <img
                  className="object-fill"
                  src={`${appConfig.appUrl}/product/${data?.image}`}
                  alt="#"
                />
              </div>
              <div className="flex items-center">
                <div className=" ">
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    {data.title}
                  </h1>
                  <h1 className=" ">{`Tersisa ${data.stock}`}</h1>
                  <div className="mt-3">
                    <div className="text-3xl font-bold">
                      {formatRupiah(data?.total)}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div>
                      <h1>{data?.desc}</h1>
                    </div>
                  </div>
                  <div className="mt-6"></div>
                </div>
              </div>
            </div>

            <StickyBox
              offsetTop={120}
              offsetBottom={20}
              className="flex gap-5 bg-white h-fit w-[300px] shadow-xl p-5 items-center flex-col   border rounded-xl"
            >
              <h1>Atur jumlah pembelian</h1>
              <Input
                fullWidth
                variant="bordered"
                color="primary"
                startContent={
                  <Button
                    onPress={() => {
                      count <= 1 ? null : setCounter(count - 1);
                      count <= 1
                        ? null
                        : setPrice(Number(price) - Number(data?.total));
                    }}
                    color="primary"
                    variant="light"
                    size="sm"
                  >
                    -
                  </Button>
                }
                endContent={
                  <Button
                    onPress={async () => {
                      if (count >= data?.stock) {
                        return toast.error("Stok hanya sisa " + data?.stock);
                      }
                      setCounter(count + 1);
                      setPrice(Number(price) + Number(data?.total));
                    }}
                    color="primary"
                    size="sm"
                    variant="light"
                  >
                    +
                  </Button>
                }
                style={{ textAlign: "center" }}
                value={String(count)}
              />
              <div className="flex justify-between w-full">
                <h1>Subtotal:</h1>
                {isLoading ? (
                  <Skeleton className="h-5 w-20 rounded-xl" />
                ) : (
                  <h1>{formatRupiah(price)}</h1>
                )}
              </div>
              <form onSubmit={handleCart} className="flex flex-col gap-3">
                <Textarea
                  name="note"
                  type="text"
                  title="exp: warna, ukuran, dll yang diinginkan"
                  size="sm"
                  label="Catatan"
                  placeholder="exp: warna, ukuran, dll. yang diinginkan"
                  fullWidth
                  color="primary"
                  isRequired
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
                <Button type="submit" size="sm" fullWidth color="primary">
                  Tambah ke keranjang
                </Button>
              </form>
            </StickyBox>
          </div>
        </div>
      </div>
    </>
  );
}
