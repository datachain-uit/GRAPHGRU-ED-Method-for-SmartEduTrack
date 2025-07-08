import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CContainer } from "@coreui/react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Overview from "./pages/Overview";
import Education from "./pages/Education";
// import PersonalizedLearning from './pages/PersonalizedLearning'; // Commented out như code gốc của bạn
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import DataQuality from "./pages/DataQuality";

function MainLayout() {
  const location = useLocation();

  // Mapping URL path to title
  const getTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "OVERVIEW DATASET";
      case "/education":
        return "EDUCATION MANAGEMENT";
      // case "/learning":
      //    return "PERSIONALIZED LEARNING";
      default:
        return "";
    }
  };

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    // Định nghĩa labels ở đây hoặc đảm bảo nó được import/defined trước khi sử dụng
    const labels = ["A", "B", "C", "D", "E"]; // Đảm bảo labels được định nghĩa

    fetch("http://127.0.0.1:8000/api/data_week3/")
      .then((response) => response.json())
      .then((data) => {
        const users = data.data.map((user, i) => ({
          id: user._id || i + 1,
          name: user.user_id || `User ${i + 1}`,
          registered: user.enroll_time ? user.enroll_time.slice(0, 10) : null,
          course: user.course_id || "Unknown",
          status: "Active",
          label: user.classification || labels[i % labels.length],
          gender: mapGenderToText(user.gender), // Giả định mapGenderToText được định nghĩa ở đâu đó
          comment_week3: user.comment_count_week3,
          reply_week3: user.reply_count_week3,
          watching_time_week3: user.user_watching_time_week2, // Lưu ý: tuần 2 ở đây
          question_done_week3: user.questions_done_week3,
          attemp_count_week3: user.attempts_count_week3,
          correct_answer_week3: user.correct_answers_week3,
          total_score_week3: user.total_score_week3,
        }));
        setAllUsers(users);
        setLoading(false); // Đặt loading thành false khi fetch xong
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Đảm bảo loading cũng tắt khi có lỗi
      });
  }, []);

  // Hàm mapGenderToText cần được định nghĩa nếu bạn dùng nó
  const mapGenderToText = (genderCode) => {
    switch (genderCode) {
      case 0:
        return "Female";
      case 1:
        return "Male";
      case 2:
        return "Other";
      default:
        return "Unknown";
    }
  };

  const title = getTitle(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main style={{ flexGrow: 1, overflowY: "auto" }}>
        {/* Truyền allUsers và loading state xuống Header */}
        <Header allUsers={allUsers} loading={loading} />
        <CContainer>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/education" element={<Education />} />
            <Route path="/dataquality" element={<DataQuality />} />
            {/* <Route path="/learning" element={<PersonalizedLearning />} /> */}
          </Routes>
        </CContainer>
        <ScrollToTopButton />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
