import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Order } from "../../_types/order";
import { appConfig, formatRupiah } from "@/app/_constant/appConfig";

export default function ModalBayar({ dataOrders }: { dataOrders: Order }) {
  interface IFormInput {
    payment: string;
  }
  const [file, setFile] = useState<File>();
  const { handleSubmit } = useForm<IFormInput>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const dataa = new FormData();
    dataa.set("file", file!);
    const result = await fetch("/api/upload", {
      method: "POST",
      body: dataa,
    });
    console.log(result);
    console.log(file);
    await axios
      .patch(`${appConfig.appApiUrl}/orders/${dataOrders.id}`, {
        payment: file?.name,
      })
      .then((res) => {
        toast.success(
          "Berhasil mengirimkan bukti pembayaran, silahkan tunggu pembayaran anda sedang diproses"
        );
      });
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen}>Bayar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Pembayaran
              </ModalHeader>
              <ModalBody>
                <p>
                  Silahkan melakukan pembayaran senilai
                  <span className="font-bold">
                    {` ${formatRupiah(dataOrders.total)}`}
                  </span>{" "}
                  ke rekening berikut:
                </p>
                <p>
                  <b>Bank BNI</b> : 1234567890
                </p>
                <p>
                  <b>Bank BRI</b> : 1234567890
                </p>
                <p>
                  <h1>Upload Bukti Pembayaran:</h1>
                  <input
                    required
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button type="submit" color="primary">
                  Bayar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
