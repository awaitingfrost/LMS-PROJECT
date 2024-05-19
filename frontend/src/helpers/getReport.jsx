import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: "2vw",
    marginBottom: "3vh",
    fontWeight: "bold",
    width: "100vw",
    textAlign: "center"
  },
  category: {
    fontSize: "1vw",
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

// Create Document Component
export const MyDocument = ({ReportData, username}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Library Management System</Text>
          <View style={styles.row}>
            <Text>SN</Text>
            <Text>Borrower Name</Text>
            <Text>Book Name</Text>
            <Text>Date</Text>
          </View>
          {ReportData?.map((item, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text style={{ fontSize: "2vw" }}>{index + 1}</Text>
                <Text style={{ fontSize: "2vw" }}>{item.borrowerName}</Text>
                <Text style={{ fontSize: "2vw" }}>{item.bookName}</Text>
                <Text style={{ fontSize: "2vw" }}>{item.updatedAt.slice(0,10)}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};