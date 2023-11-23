export const appConfig = {
  appUrl: "http://localhost:3000/",
  appName: "UMKM Pasar Aur Kuning",
  appDesc: "Tempat Terbaik untuk Mendukung UMKM Lokal.",
  appApiUrl: "http://127.0.0.1:8000/api",
};
export const formatRupiah = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .replace(/(\.|,)00$/g, "");
