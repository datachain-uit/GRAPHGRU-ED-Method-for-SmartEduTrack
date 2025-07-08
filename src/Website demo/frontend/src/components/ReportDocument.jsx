import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 15 },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  subtitle: { fontSize: 14, marginBottom: 8, fontWeight: "bold" },
  text: { fontSize: 12, marginBottom: 5 },

  // Styles for the table with borders
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16%", // 100% / 6 columns = ~16.66%
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0", // Màu nền cho header
    padding: 5,
  },
  tableCol: {
    width: "16%", // 100% / 6 columns = ~16.66%
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
});

const ReportDocument = ({
  data,
  labelCountsByCourse,
  totalUsers,
  avgStats,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>
          Report on Learning Performance in Week 3
        </Text>
        <Text style={styles.text}>Report creator: {data.name}</Text>
        <Text style={styles.text}>Created date: {data.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Learner Overview</Text>
        <Text style={styles.text}>Total Number of Learners: {totalUsers}</Text>
        <Text style={styles.text}>
          Average Watching Time: {avgStats.avgWatchingTime} hours
        </Text>
        <Text style={styles.text}>
          Average Questions Completed: {avgStats.avgQuestionDone}
        </Text>
        <Text style={styles.text}>
          Average Attempts Count: {avgStats.avgAttemptCount}
        </Text>
        <Text style={styles.text}>
          Average Correct Answers: {avgStats.avgCorrectAnswer}
        </Text>
        <Text style={styles.text}>
          Average Total Score: {avgStats.avgTotalScore}
        </Text>
        <Text style={styles.text}>
          Average Comment Count: {avgStats.avgComment}
        </Text>
        <Text style={styles.text}>
          Average Reply Count: {avgStats.avgReply}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Course Statistics</Text>

        {/* Table Container */}
        <View style={styles.table}>
          {/* Table Header Row */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Course</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>A</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>B</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>C</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>D</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>E</Text>
            </View>
          </View>

          {/* Table Rows */}
          {labelCountsByCourse.map(([course, counts], index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{course}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{counts.A}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{counts.B}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{counts.C}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{counts.D}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{counts.E}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ReportDocument;
