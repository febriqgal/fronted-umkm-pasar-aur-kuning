import { useGetCategoryApiQuery } from "@/redux/feature/categorysSlice";
import { Product } from "@/types/products";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function ModalEditProduct({
  dataProduct,
}: {
  dataProduct: Product;
}) {
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<Product>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataCategory, isLoading } = useGetCategoryApiQuery({
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Edit ${dataProduct.title}`}
              </ModalHeader>
              <ModalBody>
                <form className="space-y-2">
                  <Input
                    color="primary"
                    variant="bordered"
                    label="Nama Produk"
                    size="sm"
                    defaultValue={dataProduct.title}
                    {...register("title", { required: true })}
                  />
                  <Input
                    color="primary"
                    variant="bordered"
                    size="sm"
                    label="Deskripsi Produk"
                    defaultValue={dataProduct.desc}
                    {...register("desc", { required: true })}
                  />
                  <Input
                    color="primary"
                    variant="bordered"
                    size="sm"
                    label="Harga"
                    defaultValue={dataProduct.price}
                    {...register("price", { required: true })}
                  />
                  <Input
                    color="primary"
                    variant="bordered"
                    size="sm"
                    label="Jumlah Stok Barang"
                    defaultValue={dataProduct.stock}
                    {...register("stock", { required: true })}
                  />
                  <Input
                    color="primary"
                    variant="bordered"
                    size="sm"
                    label="Discount"
                    defaultValue={dataProduct.discount}
                    {...register("discount", { required: true })}
                  />

                  <Button
                    color="primary"
                    isLoading={loading}
                    fullWidth
                    type="submit"
                  >
                    Kirim
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
