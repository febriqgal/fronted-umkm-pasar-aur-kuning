/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@nextui-org/react";
import Header from "../../../public/headerr.jpg";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsApiQuery } from "../_redux/feature/productsSlice";
import { formatRupiah } from "../_constant/appConfig";
export default function Home() {
  const { data: dataProduct, isLoading } = useGetProductsApiQuery("products", {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="space-y-5 pt-20 min-h-screen">
      <div className="w-full h-[300px] rounded-xl  bg-primary">
        <div className=" flex justify-center rounded-xl overflow-clip items-center ">
          <Image src={Header} alt="Header" />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {dataProduct?.data.map((e: any) => {
          return (
            <Link
              href={`/product/${e.id}`}
              key={e.id}
              className=" flex-col rounded-xl shadow border-2 flex overflow-clip"
            >
              <div className="w-full h-full flex overflow-clip justify-center items-center bg-primary-100">
                <img src={`http://localhost:3000/product/${e.image}`} alt="#" />
              </div>
              <div className="bg-gradient-to-tr from-primary-900 to-primary-500 text-white text-sm w-full rounded-br-full text-start pl-2 py-1">
                {`✅ ${e.users.name}`}
              </div>
              <div className="px-2 py-2 text-start">
                <h1 className="text-xs  line-clamp-2">{e.title}</h1>
                <div>
                  <h1 className="pt-2 font-bold text-xs line-through">
                    {formatRupiah(e.price)}
                  </h1>
                  <h1 className="pb-2 font-bold">{formatRupiah(e.total)}</h1>
                </div>
                <h1 className="bg-primary-200 font-semibold text-primary-900 mb-2 px-2 py-1 rounded-md text-xs w-fit">{`Diskon ${e.discount}%`}</h1>
                <h1 className="text-sm">{``}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
