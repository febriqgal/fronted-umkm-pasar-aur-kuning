import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function NavbarUMKMComponents() {
  return (
    <div className="flex flex-col h-screen w-[300px] py-4 bg-primary items-center gap-4 text-white">
      <Link href={"/umkm"}>Dashboard UMKM</Link>
      <div className="flex flex-col gap-2">
        <Button as={Link} href="/umkm/kelola-produk">
          Kelola Produk
        </Button>
        <Button as={Link} href="/umkm/tambah-produk">
          Tambah Produk
        </Button>
      </div>
    </div>
  );
}
