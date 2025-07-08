import React from "react";
import { CCard, CCardHeader, CButton, CAvatar } from "@coreui/react";
import { Download, MoreHorizontal } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import ReportDocument from "../ReportDocument";

const Header = ({ allUsers, loading }) => {
  const handleDownload = async () => {
    if (loading) {
      console.log("Dữ liệu đang được tải, vui lòng chờ...");
      return;
    }

    const data = {
      name: "Ronaldo",
      date: new Date().toLocaleDateString("vi-VN"),
    };

    const labelCountsByCourse = {};
    // Khởi tạo các biến để tính tổng các chỉ số
    let totalComment = 0;
    let totalReply = 0;
    let totalWatchingTime = 0;
    let totalQuestionDone = 0;
    let totalAttemptCount = 0;
    let totalCorrectAnswer = 0;
    let totalTotalScore = 0;

    allUsers.forEach((user) => {
      const course = user.course || "Unknown";
      const label = user.label || "Unknown";

      if (!labelCountsByCourse[course]) {
        labelCountsByCourse[course] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
      }
      if (labelCountsByCourse[course][label] !== undefined) {
        labelCountsByCourse[course][label]++;
      }

      // Cộng dồn các giá trị để tính trung bình
      totalComment += user.comment_week3 || 0;
      totalReply += user.reply_week3 || 0;
      totalWatchingTime += user.watching_time_week3 || 0;
      totalQuestionDone += user.question_done_week3 || 0;
      totalAttemptCount += user.attemp_count_week3 || 0;
      totalCorrectAnswer += user.correct_answer_week3 || 0;
      totalTotalScore += user.total_score_week3 || 0;
    });

    const numberOfUsers = allUsers.length;

    // Tính giá trị trung bình
    const avgStats = {
      avgComment:
        numberOfUsers > 0 ? (totalComment / numberOfUsers).toFixed(2) : 0,
      avgReply: numberOfUsers > 0 ? (totalReply / numberOfUsers).toFixed(2) : 0,
      avgWatchingTime:
        numberOfUsers > 0 ? (totalWatchingTime / numberOfUsers).toFixed(2) : 0,
      avgQuestionDone:
        numberOfUsers > 0 ? (totalQuestionDone / numberOfUsers).toFixed(2) : 0,
      avgAttemptCount:
        numberOfUsers > 0 ? (totalAttemptCount / numberOfUsers).toFixed(2) : 0,
      avgCorrectAnswer:
        numberOfUsers > 0 ? (totalCorrectAnswer / numberOfUsers).toFixed(2) : 0,
      avgTotalScore:
        numberOfUsers > 0 ? (totalTotalScore / numberOfUsers).toFixed(2) : 0,
    };

    const sortedLabelCountsByCourse = Object.entries(labelCountsByCourse).sort(
      ([courseA, countsA], [courseB, countsB]) => {
        return countsB.E - countsA.E;
      }
    );

    const blob = await pdf(
      <ReportDocument
        data={data}
        labelCountsByCourse={sortedLabelCountsByCourse}
        totalUsers={numberOfUsers} // Truyền tổng số người học
        avgStats={avgStats} // Truyền các giá trị trung bình
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "report.pdf";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <CCard className="mb-3 border-0 shadow-none">
      <CCardHeader
        className="d-flex justify-content-end align-items-center"
        style={{
          backgroundColor: "#2f4050",
          color: "#fff",
          padding: "1rem",
          border: "none",
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <CButton
            color="light"
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            disabled={loading}
            style={{
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            <Download size={18} />
          </CButton>

          <CButton
            color="light"
            variant="ghost"
            size="sm"
            style={{ color: "#fff" }}
          >
            <MoreHorizontal size={20} />
          </CButton>

          <CAvatar
            src="https://i.pravatar.cc/40"
            size="md"
            style={{
              marginLeft: "8px",
              border: "2px solid #fff",
            }}
          />
        </div>
      </CCardHeader>
    </CCard>
  );
};

export default Header;
