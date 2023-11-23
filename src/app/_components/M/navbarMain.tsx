"use client";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { HiShoppingCart } from "react-icons/hi2";
import Logo from "../../../../public/logo-white.png";
import { signOut, useSession } from "next-auth/react";
import { useGetByUserIdCartsApiQuery } from "@/app/_redux/feature/cartsSlice";
import TestIcon from "../icons/testIcon";

export default function NavbarMainComponent() {
  const { data: session, status } = useSession();
  const { data: dataProduct } = useGetByUserIdCartsApiQuery(
    `${session?.user?.id}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log(dataProduct?.data);

  return (
    <div className="flex fixed w-full z-30 justify-between items-center px-20 gap-4 py-4 border-b-2 bg-white text-white">
      <Link href={"/"}>
        <div className="flex gap-4 items-center">
          <TestIcon className="w-10 h-10 fill-primary " />
          <h1 className="whitespace-nowrap text-primary font-bold">
            UMKM Pasar Aur Kuning
          </h1>
        </div>
      </Link>
      <Input
        size="sm"
        color="primary"
        startContent={"🔍"}
        placeholder="Semuanya bisa anda cari disini, kecuali jodohmu!"
      />
      <div className="flex gap-4 items-center justify-center">
        <Link href={"/cart"}>
          <Badge size="sm" content={dataProduct?.data?.length} color="primary">
            <HiShoppingCart className="w-5 h-5 fill-primary" />
          </Badge>
        </Link>
        {status === "loading" ? (
          <Skeleton className="w-16 h-6 rounded-xl" />
        ) : (
          <>
            {session ? (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem isReadOnly className="text-center">
                    {session.user?.name}
                  </DropdownItem>
                  <DropdownItem as={Link} href={"/riwayat"}>
                    Riwayat Pembelian
                  </DropdownItem>
                  {session.user?.role === "umkm" ? (
                    <DropdownItem as={Link} href={"/umkm/kelola-produk"}>
                      Dashboard UMKM
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      as={Link}
                      href={
                        session.user?.role === "admin"
                          ? "/admin/kelola-user"
                          : "/user/riwayat-pembelian"
                      }
                    >
                      {session.user?.role === "admin"
                        ? "Dashboard Admin"
                        : "Dashboard User"}
                    </DropdownItem>
                  )}

                  <DropdownItem
                    onPress={async () => await signOut()}
                    className="text-danger"
                    color="danger"
                  >
                    Keluar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button as={Link} href="/login">
                Login
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
