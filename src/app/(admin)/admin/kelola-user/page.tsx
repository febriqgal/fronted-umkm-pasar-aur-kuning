"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect } from "react";
import { User } from "../../../_types/user";
import { appConfig } from "@/app/_constant/appConfig";

export default function KelolaUserPage() {
  const [data, setData] = React.useState([]);
  const fecthData = async () => {
    const res = await axios.get(`${appConfig.appApiUrl}/users`);
    const data = res.data.data;
    setData(data);
  };
  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>HP</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item: User, i: number) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}.</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
