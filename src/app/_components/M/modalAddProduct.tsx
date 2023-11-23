import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalAddProduct() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="mb-4" color="primary" onPress={onOpen}>
        Tambah Produk
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus produk ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger">Hapus</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
