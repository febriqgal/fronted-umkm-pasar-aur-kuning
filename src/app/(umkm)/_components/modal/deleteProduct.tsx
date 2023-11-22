import { useDeleteProductsMutation } from "@/redux/feature/productsSlice";
import { Product } from "@/types/products";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalDeleteProduct({
  dataProduct,
}: {
  dataProduct: Product;
}) {
  const [deleteProduct] = useDeleteProductsMutation();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Hapus
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Delete ${dataProduct.title}?`}
              </ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus produk ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="danger"
                  onPress={() => deleteProduct(dataProduct.id)}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
