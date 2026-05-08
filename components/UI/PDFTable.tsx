// import { View, Text, Image } from "@react-pdf/renderer";
// import { StyleSheet } from "@react-pdf/renderer";
// const styles = StyleSheet.create({
//   page: { padding: 50, fontSize: 10, fontFamily: "Helvetica" },
//   header: {
//     marginBottom: 0,
//     paddingBottom: 10,
//     fontSize: 10,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: "bold",
//     padding: 10,
//     alignSelf: "center",
//   },

//   headerTitle: { fontSize: 13, fontWeight: "bold" },
//   section: { marginTop: 15, marginBottom: 10 },
//   sectionTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     padding: 5,
//   },
//   row: {
//     flexDirection: "row",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#eee",
//     padding: 5,
//   },
//   label: { width: "70%" },
//   value: { width: "30%", textAlign: "right", fontWeight: "bold" },
//   link: { textDecoration: "underline", color: "blue" },
//   footer: { marginTop: 30, textAlign: "center", fontSize: 8, color: "gray" },
//   table: {
//     display: "flex",
//     width: "auto",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#000000",
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     margin: "auto",
//     flexDirection: "row",
//   },
//   tableColHeader: {
//     width: "25%",
//     borderStyle: "solid",
//     borderBottomWidth: 1,
//     borderColor: "#bfbfbf",
//     borderRightWidth: 1,
//     backgroundColor: "#f0f0f0",
//   },
//   tableCol: {
//     width: "25%",
//     borderStyle: "solid",
//     borderBottomWidth: 1,
//     borderColor: "#bfbfbf",
//     borderRightWidth: 1,
//   },
//   tableCellHeader: {
//     margin: 5,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 10,
//   },
// });
// export const TableRow = ({ label, score, importance }: any) => (
//   <View style={styles.tableRow}>
//     <View style={[styles.tableCol, { width: "50%" }]}>
//       <Text style={styles.tableCell}>{label}</Text>
//     </View>
//     <View style={[styles.tableCol, { width: "25%" }]}>
//       <Text style={styles.tableCell}>{importance}</Text>
//     </View>
//     <View style={[styles.tableCol, { width: "25%" }]}>
//       <Text style={styles.tableCell}>{score}</Text>
//     </View>
//   </View>
// );

// export const TableHeader = () => (
//   <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
//     <View style={[styles.tableCol, { width: "50%" }]}>
//       <Text style={styles.tableCellHeader}>Evaluation Criteria</Text>
//     </View>
//     <View style={[styles.tableCol, { width: "25%" }]}>
//       <Text style={styles.tableCellHeader}>Importance</Text>
//     </View>
//     <View style={[styles.tableCol, { width: "25%" }]}>
//       <Text style={styles.tableCellHeader}>Rating</Text>
//     </View>
//   </View>
// );
