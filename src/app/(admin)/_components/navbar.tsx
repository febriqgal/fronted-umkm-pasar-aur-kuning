import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
export default function NavbarAdminComponent() {
  const pathname = usePathname();
  return (
    <div className="py-4 text-white px-20 bg-primary flex  gap-4 items-center">
      <Link href={"/admin"} className="font-bold">
        admin
      </Link>
      <Button
        as={Link}
        variant={pathname === "/admin/kelola-user" ? "solid" : "light"}
        href="/admin/kelola-user"
        color="default"
      >
        Kelola User
      </Button>
    </div>
  );
}
