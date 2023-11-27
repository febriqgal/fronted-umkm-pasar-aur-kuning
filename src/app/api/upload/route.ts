import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file: any = data.get("file");
  if (!file) {
    return NextResponse.json({ message: "404" });
  }
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  const path = `./public/product/${file.name}`;

  await writeFile(path, buffer);
  return NextResponse.json({ message: "Success" });
}
