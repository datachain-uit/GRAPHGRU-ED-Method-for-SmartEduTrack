import React, { useState, useEffect } from "react";
import {
  FaComments,
  FaReply,
  FaQuestion,
  FaRedo,
  FaCheck,
  FaStar,
} from "react-icons/fa";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CPagination,
  CPaginationItem,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
} from "@coreui/react";

const labels = ["A", "B", "C", "D", "E"];

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const getLabelBadgeColor = (label) => {
  switch (label) {
    case "A":
      return "success";
    case "B":
      return "primary";
    case "C":
      return "warning";
    case "D":
      return "danger";
    case "E":
      return "dark";
    default:
      return "secondary";
  }
};

const ITEMS_PER_PAGE = 10;

const StudentTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [predictionLabel, setPredictionLabel] = useState("");
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const [filterCourse, setFilterCourse] = useState("");
  const [filterMonthYear, setFilterMonthYear] = useState("");

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

  const mapGenderToNumber = (genderText) => {
    switch (genderText) {
      case "Female":
        return 0;
      case "Male":
        return 1;
      case "Other":
        return 2;
      default:
        return 2;
    }
  };

  useEffect(() => {
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
          gender: mapGenderToText(user.gender),
          school_encoded: user.school_encoded,
          course_id_encoded: user.course_id_encoded,
          comment_count_week1: user.comment_count_week1,
          reply_count_week1: user.reply_count_week1,
          user_watching_time_week1: user.user_watching_time_week1,
          questions_done_week1: user.questions_done_week1,
          attempts_count_week1: user.attempts_count_week1,
          correct_answers_week1: user.correct_answers_week1,
          total_score_week1: user.total_score_week1,
          comment_count_week2: user.comment_count_week2,
          reply_count_week2: user.reply_count_week2,
          user_watching_time_week2: user.user_watching_time_week2,
          questions_done_week2: user.questions_done_week2,
          attempts_count_week2: user.attempts_count_week2,
          correct_answers_week2: user.correct_answers_week2,
          total_score_week2: user.total_score_week2,
          comment_count_week3: user.comment_count_week3,
          reply_count_week3: user.reply_count_week3,
          user_watching_time_week3: user.user_watching_time_week3,
          questions_done_week3: user.questions_done_week3,
          attempts_count_week3: user.attempts_count_week3,
          correct_answers_week3: user.correct_answers_week3,
          total_score_week3: user.total_score_week3,
        }));
        setAllUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const matchesCourse = filterCourse
      ? user.course.toLowerCase().includes(filterCourse.toLowerCase())
      : true;

    const matchesMonthYear = filterMonthYear
      ? user.registered && user.registered.startsWith(filterMonthYear)
      : true;

    return matchesCourse && matchesMonthYear;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleShow = async (user) => {
    setSelectedUser(user);
    setPredictionLabel("");
    setLoadingPrediction(true);

    const payload = {
      gender: mapGenderToNumber(user.gender),
      comment_count_week1: user.comment_count_week1,
      reply_count_week1: user.reply_count_week1,
      questions_done_week1: user.questions_done_week1,
      attempts_count_week1: user.attempts_count_week1,
      correct_answers_week1: user.correct_answers_week1,
      total_score_week1: user.total_score_week1,
      user_watching_time_week1: user.user_watching_time_week1,
      comment_count_week2: user.comment_count_week2,
      reply_count_week2: user.reply_count_week2,
      questions_done_week2: user.questions_done_week2,
      attempts_count_week2: user.attempts_count_week2,
      correct_answers_week2: user.correct_answers_week2,
      total_score_week2: user.total_score_week2,
      user_watching_time_week2: user.user_watching_time_week2,
      comment_count_week3: user.comment_count_week3,
      reply_count_week3: user.reply_count_week3,
      questions_done_week3: user.questions_done_week3,
      attempts_count_week3: user.attempts_count_week3,
      correct_answers_week3: user.correct_answers_week3,
      total_score_week3: user.total_score_week3,
      user_watching_time_week3: user.user_watching_time_week3,
      school_encoded: user.school_encoded,
      course_id_encoded: user.course_id_encoded,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPredictionLabel(result.prediction_label);
      setVisible(true);
    } catch (error) {
      console.error("Error sending data to API:", error);
      setPredictionLabel("Error");
      setVisible(true);
    } finally {
      setLoadingPrediction(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const pageNumbers = [];
    const delta = 2;

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pageNumbers.push(
      <CPaginationItem
        key={1}
        active={1 === currentPage}
        onClick={() => handlePageChange(1)}
      >
        1
      </CPaginationItem>
    );

    if (left > 2) {
      pageNumbers.push(
        <CPaginationItem key="left-ellipsis" disabled>
          …
        </CPaginationItem>
      );
    }

    for (let i = left; i <= right; i++) {
      pageNumbers.push(
        <CPaginationItem
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </CPaginationItem>
      );
    }

    if (right < totalPages - 1) {
      pageNumbers.push(
        <CPaginationItem key="right-ellipsis" disabled>
          …
        </CPaginationItem>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <CPaginationItem
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </CPaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Learner Overview</CCardHeader>
        <CCardBody>
          <CRow className="mb-3 align-items-end">
            <CCol md={4}>
              <CFormLabel htmlFor="courseFilter">Filter by Course</CFormLabel>
              <CFormInput
                type="text"
                id="courseFilter"
                placeholder="Enter course name or ID"
                value={filterCourse}
                onChange={(e) => {
                  setFilterCourse(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="monthYearFilter">
                Filter by Month/Year
              </CFormLabel>
              <CFormInput
                type="month"
                id="monthYearFilter"
                value={filterMonthYear}
                onChange={(e) => {
                  setFilterMonthYear(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </CCol>
            <CCol md={2}>
              <CButton
                style={{ backgroundColor: "rgb(77, 46, 134)", color: "#fff" }}
                className="w-70"
                onClick={() => {
                  setFilterCourse("");
                  setFilterMonthYear("");
                  setCurrentPage(1);
                }}
              >
                Reset Filters
              </CButton>
            </CCol>
          </CRow>

          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>User ID</CTableHeaderCell>
                <CTableHeaderCell>Registered</CTableHeaderCell>
                <CTableHeaderCell>Course</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentUsers.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.name}</CTableDataCell>
                  <CTableDataCell>{user.registered}</CTableDataCell>
                  <CTableDataCell>{user.course}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={getBadge(user.status)}>{user.status}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      variant="outline"
                      size="sm"
                      onClick={() => handleShow(user)}
                    >
                      Show
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <CPagination align="center" className="mt-3">
            {renderPaginationItems()}
          </CPagination>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader onClose={() => setVisible(false)}>
          <strong>Learner Performance Week 3</strong>
        </CModalHeader>
        <CModalBody>
          {selectedUser && (
            <>
              <div className="mb-3">
                <p>
                  <strong>User ID:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Registered:</strong> {selectedUser.registered}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedUser.gender}
                </p>
                <p>
                  <strong>Course ID:</strong> {selectedUser.course}
                </p>
                <p>
                  <strong>Status:</strong> {selectedUser.status}
                </p>
                <p>
                  <strong>Prediction Label:</strong>{" "}
                  {loadingPrediction ? (
                    <span>Loading...</span>
                  ) : (
                    <CBadge
                      color={getLabelBadgeColor(predictionLabel)}
                      className="ms-2"
                    >
                      {predictionLabel || selectedUser.label}
                    </CBadge>
                  )}
                </p>
              </div>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <FaComments className="me-2 text-primary" />
                  <strong>Number of comment:</strong>{" "}
                  {selectedUser.comment_count_week3}
                </div>
                <div className="col-md-6 mb-2">
                  <FaReply className="me-2 text-info" />
                  <strong>Number of reply:</strong>{" "}
                  {selectedUser.reply_count_week3}
                </div>
                <div className="col-md-6 mb-2">
                  <FaQuestion className="me-2 text-warning" />
                  <strong>Question done:</strong>{" "}
                  {selectedUser.questions_done_week3}
                </div>
                <div className="col-md-6 mb-2">
                  <FaRedo className="me-2 text-danger" />
                  <strong>Attempts count:</strong>{" "}
                  {selectedUser.attempts_count_week3}
                </div>
                <div className="col-md-6 mb-2">
                  <FaCheck className="me-2 text-success" />
                  <strong>Correct answers:</strong>{" "}
                  {selectedUser.correct_answers_week3}
                </div>
                <div className="col-md-6 mb-2">
                  <FaStar className="me-2 text-warning" />
                  <strong>Total score:</strong> {selectedUser.total_score_week3}
                </div>
              </div>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default StudentTable;
