import { formatRupiah } from "@/app/_constant/appConfig";
import {
  useGetByStatusOrdersApiQuery,
  useGetByidOrdersApiQuery,
} from "@/app/_redux/feature/ordersSlice";
import { Order } from "@/app/_types/order";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import "dayjs/locale/id";
import { useSession } from "next-auth/react";

export default function Pdf() {
  const { data: session } = useSession();
  const { data: dataOrders } = useGetByidOrdersApiQuery(session?.user?.id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(dataOrders?.data);
  const { data: dataStatusOrder } = useGetByStatusOrdersApiQuery("success", {
    refetchOnMountOrArgChange: true,
  });
  console.log(dataStatusOrder?.data);

  const styles = StyleSheet.create({
    table: {
      display: "flex",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      textAlign: "left",

      margin: 5,
      fontSize: 10,
    },
  });
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page
          size="A4"
          style={{ marginVertical: 32, marginLeft: 32, paddingRight: 64 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 10 }}>
            Laporan Penjualan
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View
                style={{
                  width: 20,
                  textAlign: "center",
                  paddingTop: 5,
                  borderRight: 1,
                  marginBottom: 1,
                  borderBottom: 1,
                }}
              >
                <Text style={{ fontSize: 10 }}>No.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Produk</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>qty</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Alamat</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
            </View>
            {dataStatusOrder?.data.map((e: Order, i: any) => {
              const res = e;
              console.log(res.total);
              return (
                <View key={i} style={styles.tableRow}>
                  <View
                    style={{
                      width: 20,
                      borderRight: 1,
                      borderBottom: 1,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,
                    }}
                  >
                    <Text
                      style={{ fontSize: 10, paddingTop: 5, paddingLeft: 2 }}
                    >
                      {i + 1}.
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{res.product.title}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{res.cart.quantity}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{res.user.address}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {formatRupiah(res.total)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{ marginTop: 60, fontSize: 10 }}>
            <View>
              <Text
                style={{ textAlign: "right" }}
              >{`Total Penjualan :  ${formatRupiah(
                dataStatusOrder?.data.reduce((a: any, b: any) => a + b.total, 0)
              )}`}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
