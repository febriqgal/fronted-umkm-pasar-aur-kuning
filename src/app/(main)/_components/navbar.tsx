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
import { useGetByUserIdCartsApiQuery } from "@/redux/feature/cartsSlice";
export default function NavbarComponent() {
  const { data: session, status } = useSession();
  const { data: dataProduct } = useGetByUserIdCartsApiQuery(
    `${session?.user?.id}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log(dataProduct?.data);

  return (
    <div className="flex fixed w-full z-30 justify-between items-center px-20 gap-4 py-4 bg-primary text-white">
      <Link href={"/"}>
        <Image height={50} src={Logo} alt="#" />
      </Link>
      <Input
        size="sm"
        startContent={"🔍"}
        placeholder="Semuanya bisa anda cari disini, kecuali jodohmu!"
      />
      <div className="flex gap-4 items-center justify-center">
        <Link href={"/cart"}>
          <Badge size="sm" content={dataProduct?.data?.length} color="primary">
            <HiShoppingCart className="w-5 h-5" />
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
                      href={session.user?.role === "admin" ? "/admin" : "/user"}
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
