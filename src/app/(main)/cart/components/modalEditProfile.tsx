"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { User } from "../types/cart";
import { useUpdateUsersMutation } from "@/redux/feature/usersSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import { appConfig } from "@/constant/appConfig";
import toast from "react-hot-toast";

export default function ModalEditProfile({ dataUsers }: { dataUsers: User }) {
  interface IFormInput {
    address: string;
  }
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await axios
      .patch(`${appConfig.appApiUrl}/users/${session?.user.id}`, {
        address: data.address,
      })
      .then((res) => {
        toast.success("Berhasil ubah alamat");
      });
  };
  return (
    <>
      <Button size="sm" onPress={onOpen}>
        Ubah Alamat
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Edit Alamat
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Alamat"
                  defaultValue={dataUsers.address}
                  {...register("address")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" type="submit">
                  Kirim
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
