import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 'extrabold'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
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
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  bold: {
    fontWeight: 'bold'
  },
  width25: {
    width: '25%',
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  }
});

const MyDocument = ({ reportData, reportTitle, tableHeader, type }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{reportTitle}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {tableHeader.map((each, idx) => (
              <View key={idx} style={type === 'transaction' ? styles.tableCol : styles.width25}><Text style={[styles.tableCell, styles.bold]}>{each}</Text></View>
            ))}
          </View>
          {/* Table Content */}
          {type === 'transaction' && reportData?.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              {<View style={styles.tableCol}><Text style={styles.tableCell}>{index + 1}</Text></View>}
              {<View style={styles.tableCol}><Text style={styles.tableCell}>{row?.bookName}</Text></View>}
              {<View style={styles.tableCol}><Text style={styles.tableCell}>{row?.borrowerName}</Text></View>}
              {<View style={styles.tableCol}><Text style={styles.tableCell}>{row?.transactionDate?.slice(0, 10)}</Text></View>}
              {<View style={styles.tableCol}><Text style={styles.tableCell}>{row?.returnedDate ? new Date(row.returnedDate).toISOString().split('T')[0] : 'Not returned yet'}</Text></View>}
            </View>
          ))}

          {type === 'book' && reportData?.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              {<View style={styles.width25}><Text style={styles.tableCell}>{index + 1}</Text></View>}
              {<View style={styles.width25}><Text style={styles.tableCell}>{row.bookName}</Text></View>}
              {<View style={styles.width25}><Text style={styles.tableCell}>{row.author}</Text></View>}
              {<View style={styles.width25}><Text style={styles.tableCell}>{row.createdAt.slice(0, 10)}</Text></View>}
            </View>
          ))}

          {type === 'member' && reportData?.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              {<View style={styles.width25}><Text style={styles.tableCell}>{index + 1}</Text></View>}
              {<View style={styles.width25}><Text style={styles.tableCell}>{row.userFullName}</Text></View>}
              {<View style={styles.width25}><Text style={styles.tableCell}>{row.userType}</Text></View>}
              {<View style={styles.width25}><Text style={styles.tableCell}>{row.employeeId ? row.employeeId : row.admissionId}</Text></View>}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document >
);

export default MyDocument;
