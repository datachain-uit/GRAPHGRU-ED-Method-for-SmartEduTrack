// /* PersonalizedLearning.jsx
//  * Displays a dashboard for analyzing learning dataset with visualizations and evaluation metrics.
//  * Includes dataset information, descriptive statistics, gender/field distributions, and direct/indirect evaluations.
//  */

// import React, { useState, useEffect } from 'react';
// import {
//   CButton,
//   CRow,
//   CCol,
//   CInputGroup,
//   CFormInput,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilMagnifyingGlass, cilLoopCircular, cilSpreadsheet } from '@coreui/icons';
// import { Pie, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   LineElement,
//   PointElement,
// } from 'chart.js';

// // Register Chart.js components for pie and bar charts
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement,);
// import { Line } from 'react-chartjs-2';

// // Chart options for bar charts
// const chartOptions = {
//   responsive: true,
//   plugins: { legend: { position: 'top' }, title: { display: false } },
//   scales: { y: { min: 0, max: 100, ticks: { callback: (v) => `${v}%` } } },
// };

// // Memoized Pie chart to optimize performance
// const MemoizedPie = React.memo(({ data }) => (
//   <Pie
//     data={data}
//     options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
//   />
// ));

// // Memoized Bar chart to optimize performance
// const MemoizedBar = React.memo(({ data, options }) => <Bar data={data} options={options} />);

// const MemoizedLine = React.memo(({ data, options }) => <Line data={data} options={options} />);

// // Map display keys to datasetInfo keys
// const keyMap = {
//   'Row': 'row',
//   'Column': 'col',
//   'Unique row': 'unique_row',
//   'Missing values': 'missing_value_rate',
//   'Data types': 'datatype',
// };


// // Main component for the personalized learning dashboard
// const PersonalizedLearning = () => {
//   // State for search input and evaluation metric selection
//   const [searchTerm, setSearchTerm] = useState('');
//   const [reliabilityMetric, setReliabilityMetric] = useState('@5');
//   const [relevanceMetric, setRelevanceMetric] = useState('@5');
//   const [selectedMetric, setSelectedMetric] = useState('completeness');
//   const [datasetInfo, setDatasetInfo] = useState({});
//   const [data, setData] = useState({});
//   const [consistencyPassRate, setConsistencyPassRate] = useState(0);
//   const [completenessPassRate, setCompletenessPassRate] = useState(0);
//   const [statistics1, setDescriptiveStatistics1] = useState({});
//   const [statistics2, setDescriptiveStatistics2] = useState({});
//   const [statistics3, setDescriptiveStatistics3] = useState({});
//   const [statistics4, setDescriptiveStatistics4] = useState({});
//   const [statistics5, setDescriptiveStatistics5] = useState({});
//   const [f1Metric, setF1Metric] = useState('@5');
//   const [baselines, setBaseline] = useState([]);
//   const [precision, setPrecision] = useState([]);
//   const [recall, setRecall] = useState([]);
//   const [ndcg, setNDCG] = useState([]);
//   const [MAP, setMAP] = useState([]);
//   const [F1Score, setF1Score] = useState([]); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/recommender_datainfo/");
//         const result = await response.json();
//         console.log("API result:", result);
//         const new_data = {
//           dataset_name: result.data[0].dataset_name,
//           dataset_info: result.data[0].dataset_info,
//           gender_rate: result.data[0].gender_rate,
//           top10fields: result.data[0].top10field.fields,
//           top10fields_count: result.data[0].top10field.count,
//         };
//         setData(new_data);
//         setDatasetInfo(result.data[0].dataset_info); // Assuming the API returns an array of objects
//         setConsistencyPassRate(result.data[0].evaluation.consistencyData.overallPassRate); // Assuming the API returns an array of objects
//         setCompletenessPassRate(result.data[0].evaluation.completenessData.overallPaseRate); // Assuming the API returns an array of objects
//         setDescriptiveStatistics1(result.data[0].descriptiveStatistics.enroll_time);
//         setDescriptiveStatistics2(result.data[0].descriptiveStatistics.user_gender);
//         setDescriptiveStatistics3(result.data[0].descriptiveStatistics.course_total_comments);
//         setDescriptiveStatistics4(result.data[0].descriptiveStatistics.user_course_num_comment);
//         setDescriptiveStatistics5(result.data[0].descriptiveStatistics.user_course_num_replies);
//         setBaseline(result.data[0].evaluation.baseline);
//         setPrecision(result.data[0].evaluation.precision);
//         setRecall(result.data[0].evaluation.recall);
//         setNDCG(result.data[0].evaluation.ndcg);
//         setMAP(result.data[0].evaluation.MAP);
//         setF1Score(result.data[0].evaluation.F1Score);
//         console.log("API result:", result);
//         console.log(result.data[0].evaluation.baseline)
//         // console.log("data:", data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   // Descriptive statistics for sample columns
//   const descriptiveStatistics = {
//     enroll_time: { count: statistics1[0], mean: statistics1[1], std: statistics1[2], min: statistics1[3], '25%': statistics1[4], '50%': statistics1[5], '75%': statistics1[6], max: statistics1[7] },
//     user_gender: { count: statistics2[0], mean: statistics2[1], std: statistics2[2], min: statistics2[3], '25%': statistics2[4], '50%': statistics2[5], '75%': statistics2[6], max: statistics2[7] },
//     course_total_comments: { count: statistics3[0], mean: statistics3[1], std: statistics3[3], min: statistics3[3], '25%': statistics3[4], '50%': statistics3[5], '75%': statistics3[6], max: statistics3[7] },
//     user_course_num_comment: { count: statistics4[0], mean: statistics4[1], std: statistics4[2], min: statistics4[3], '25%': statistics4[4], '50%': statistics4[5], '75%': statistics4[6], max: statistics4[7] },
//     user_course_num_replies: { count: statistics5[0], mean: statistics5[1], std: statistics5[2], min: statistics5[3], '25%': statistics5[4], '50%': statistics5[5], '75%': statistics5[6], max: statistics5[7] },
//   };

//   // Gender distribution pie chart data
//   const genderData = {
//     labels: ['Male', 'Female', 'Other'],
//     datasets: [{
//       data: data.gender_rate,
//       backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
//       hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
//     }],
//   };


//   // Top 10 popular fields bar chart data
//   const fieldsData = {
//     labels: data.top10fields,
//     datasets: [{
//       label: 'Registrations',
//       data: data.top10fields_count,
//       backgroundColor: '#4BC0C0',
//       borderColor: '#4BC0C0',
//       borderWidth: 1,
//     }],
//   };  
// // const baselines = ["V1-CBF@5", "V1-CBF@10","V2-CBF@5", "V2-CBF@10", "V3-CBF@5", "V3-CBF@10","V1-DeepFM@5", "V1-DeepFM@10","V3-DeepFM@5", "V3-DeepFM@10"]
// // const precision = [0.0088, 0.0065,0.0131, 0.0089,0.0086, 0.0063,0.007, 0.0058,0.0069, 0.0058]
// // const recall = [0.044, 0.0647,0.0656, 0.0887,0.043, 0.063,0.0348, 0.0576,0.0347, 0.0585]
// // const ndcg = [0.024, 0.0306,0.0346, 0.0421,0.0239, 0.0303,0.0223, 0.0295,0.0234, 0.031]
// // const MAP = [0.0174, 0.0201,0.0245, 0.0276,0.0176, 0.0202,0.0182, 0.0211,0.0197, 0.0228]
// // const F1Score = [0.0147, 0.0118,0.0219, 0.0161,0.0143, 0.0115,0.0116, 0.0105,0.0116, 0.0106]
// //   'V1-CBF@5', 'V1-DeepFM@5', 'V1-BPRMF@5', 'V1-KGAT@5',
// //   'V2-CBF@5', 'V2-DeepFM@5', 'V2-BPRMF@5', 'V2-KGAT@5',
// //   'V3-CBF@5', 'V3-DeepFM@5', 'V3-BPRMF@5', 'V3-KGAT@5',
// //   'V1-CBF@10', 'V1-DeepFM@10', 'V1-BPRMF@10', 'V1-KGAT@10',
// //   'V2-CBF@10', 'V2-DeepFM@10', 'V2-BPRMF@10', 'V2-KGAT@10',
// //   'V3-CBF@10', 'V3-DeepFM@10', 'V3-BPRMF@10', 'V3-KGAT@10',
// // ];

// // const precision = [0.67, 0.84, 0.87, 0.75, 0.69, 0.85, 0.88, 0.76, 0.70, 0.87, 0.89, 0.77, 0.69, 0.81, 0.85, 0.77, 0.71, 0.82, 0.86, 0.78, 0.72, 0.84, 0.88, 0.80];
// // const recall    = [0.82, 0.69, 0.71, 0.63, 0.83, 0.70, 0.72, 0.64, 0.84, 0.72, 0.74, 0.66, 0.84, 0.70, 0.72, 0.64, 0.85, 0.72, 0.74, 0.65, 0.86, 0.74, 0.76, 0.67];
// // const ndcg      = [0.70, 0.72, 0.71, 0.69, 0.71, 0.73, 0.73, 0.70, 0.73, 0.75, 0.76, 0.72, 0.73, 0.74, 0.73, 0.71, 0.74, 0.75, 0.74, 0.72, 0.75, 0.77, 0.76, 0.73];
// // const MAP       = [0.005, 0.006, 0.5, 0.2, 0.1, 0.6, 0.82, 0.72, 0.2, 0.81, 0.83, 0.74, 0.65, 0.68, 0.70, 0.72, 0.77, 0.79, 0.82, 0.74, 0.73, 0.75, 0.76, 0.73];
// // const F1Score   = [0.62, 0.75, 0.78, 0.70, 0.65, 0.78, 0.81, 0.72, 0.67, 0.80, 0.83, 0.74, 0.70, 0.82, 0.85, 0.76, 0.68, 0.79, 0.82, 0.73, 0.70, 0.75, 0.78, 0.72];
// function buildMetricsDict(baselines, metricsDict) {
//   const result = { '@5': {}, '@10': {} };

//   for (const metricName in metricsDict) {
//     const values = metricsDict[metricName];

//     baselines.forEach((baseline, index) => {
//       const [versionModel, k] = baseline.split('@');
//       const [, model] = versionModel.split('-');  // version bỏ qua
//       const kLabel = '@' + k;

//       if (!result[kLabel][metricName]) {
//         result[kLabel][metricName] = {};
//       }

//       if (!result[kLabel][metricName][model]) {
//         result[kLabel][metricName][model] = [];
//       }

//       result[kLabel][metricName][model].push(values[index]);
//     });
//   }

//   return result;
// }
// const metricsDict = {
//   Precision: precision,
//   Recall: recall,
//   NDCG: ndcg,
//   MAP: MAP,
//   F1Score: F1Score,
// };

// const structuredMetrics = buildMetricsDict(baselines, metricsDict);

//   // Reliability evaluation bar chart data
//   // const reliabilityData = {
//   //   '@5': { labels: models, datasets: [{ label: 'MAP', data: reliability5map, backgroundColor: '#0071BC' }] },
//   //   '@10': { labels: models, datasets: [{ label: 'MAP', data: reliability10map, backgroundColor: '#0071BC' }] },
//   // };
//   const tension = 0.4
//   const reliabilityData = {
//     '@5': {
//       labels: ['V1', 'V2', 'V3'],
//       datasets: [
//         { label: 'CBF', data: structuredMetrics['@5'].MAP?.CBF || [], borderColor: '#0071BC', tension: tension},
//         { label: 'DeepFM', data: structuredMetrics['@5'].MAP?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@5'].MAP?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@5'].MAP?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//     },
//     '@10': {
//       labels: ['V1', 'V2', 'V3'],
//       datasets: [
//         { label: 'CBF', data: structuredMetrics['@10'].MAP?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@10'].MAP?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@10'].MAP?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@10'].MAP?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//     },
//   };

//   const relevanceData = {
//     '@5': {
//       labels: ['V1', 'V2', 'V3'],
//       Precision: [
//         { label: 'CBF', data: structuredMetrics['@5'].Precision?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@5'].Precision?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@5'].Precision?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@5'].Precision?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//       Recall: [
//         { label: 'CBF', data: structuredMetrics['@5'].Recall?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@5'].Recall?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@5'].Recall?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@5'].Recall?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//       NDCG: [
//         { label: 'CBF', data: structuredMetrics['@5'].NDCG?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@5'].NDCG?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@5'].NDCG?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@5'].NDCG?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//     },
//     '@10': {
//       labels: ['V1', 'V2', 'V3'],
//       Precision: [
//         { label: 'CBF', data: structuredMetrics['@10'].Precision?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@10'].Precision?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@10'].Precision?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@10'].Precision?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//       Recall: [
//         { label: 'CBF', data: structuredMetrics['@10'].Recall?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@10'].Recall?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@10'].Recall?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@10'].Recall?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//       NDCG: [
//         { label: 'CBF', data: structuredMetrics['@10'].NDCG?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@10'].NDCG?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@10'].NDCG?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@10'].NDCG?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//     },
//   };

//   // Completeness evaluation data
//   const completenessData = {
//     overallPassRate: completenessPassRate,
//     definition: {
//       title: 'Definition',
//       text: {
//         completeness: { term: 'Completeness:', definition: 'The dataset must contain all necessary information without missing any critical elements.' },
//         approach: { term: 'Measurement approach:', definition: 'Completeness is calculated as the ratio between the number of valid (non-missing) values and the total number of expected values.' },
//       },
//     },
//     errorLog: [
//       'Row 2831: Missing value in `teacher_id`',
//       'Row 1025: Missing value in `course_name`',
//       'Row 1025: Missing value in `course_name`',
//       'Row 2831: Missing value in `teacher_id`',
//       'Row 1025: Missing value in `course_name`',
//       'Row 1025: Missing value in `course_name`',
//     ],
//   };

//   // Consistency evaluation data
//   const consistencyData = {
//     overallPassRate: consistencyPassRate,
//     criterionPassRates: [
//       { name: 'Domain Range:', passRate: 100 },
//       { name: 'Non-null:', passRate: 85 },
//       { name: 'Data Type:', passRate: 60 },
//       { name: 'Logical Constraints:', passRate: 30 },
//       { name: 'Uniqueness:', passRate: 30 },
//       { name: 'Foreign Key Integrity:', passRate: 30 },
//     ],
//     definition: {
//       title: 'Definition',
//       text: {
//         intro: "<strong style='font-weight: 600;'>Consistency:</strong> Data must be uniform across different sources and systems, with no conflicts or duplications.",
//         heading: 'Basic Validity Checks:',
//         criteria: [
//           { name: 'Domain Range', description: 'The value must fall within a predefined range.' },
//           { name: 'Non-null', description: 'The value must not be empty or missing.' },
//           { name: 'Data Type', description: 'The value must conform to a specified data type.' },
//           { name: 'Logical Constraints', description: 'The value must satisfy a logical condition.' },
//           { name: 'Uniqueness', description: 'The value must be unique within the dataset.' },
//           { name: 'Foreign Key Integrity', description: 'The value must exist in a valid reference list.' },
//         ],
//       },
//     },
//     errorLog: [
//       'Row 550: Inconsistent date format in `event_date`',
//       'Row 1120: Conflict between `start_time` and `end_time`',
//       'Row 1500: Inconsistent currency code',
//     ],
//   };

//   // Sample line chart data for F1-score across dataset versions
//   const f1ScoreData = {
//     '@5': {
//       labels: ['V1', 'V2', 'V3'],
//       datasets: [
//         { label: 'CBF', data: structuredMetrics['@5'].F1Score?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@5'].F1Score?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@5'].F1Score?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@5'].F1Score?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//     },
//     '@10': {
//       labels: ['V1', 'V2', 'V3'],
//       datasets: [
//         { label: 'CBF', data: structuredMetrics['@10'].F1Score?.CBF || [], borderColor: '#0071BC', tension: tension },
//         { label: 'DeepFM', data: structuredMetrics['@10'].F1Score?.DeepFM || [], borderColor: '#FC842F', tension: tension },
//         { label: 'BPRMF', data: structuredMetrics['@10'].F1Score?.BPRMF || [], borderColor: '#34A853', tension: tension },
//         { label: 'KGAT', data: structuredMetrics['@10'].F1Score?.KGAT || [], borderColor: '#FF6600', tension: tension },
//       ],
//     },
//   };

//   // Handle search input changes
//   const handleSearchChange = (event) => setSearchTerm(event.target.value);

//   // Trigger dataset update (placeholder for API call)
//   const handleUpdateDataset = () => alert('Đang cập nhật Dataset...');

//   const handleExportReport = () => alert('Exporting Report...')

//   // Determine progress bar color based on percentage
//   const getProgressColor = (percentage) => {
//     if (percentage < 40) return '#FF0000';
//     if (percentage < 80) return '#FFA500';
//     return '#34A853';
//   };

//   // Component to toggle between @5 and @10 metrics
//   const MetricSwitch = ({ current, onChange }) => (
//     <div style={{ display: 'flex', gap: 8 }}>
//       {['@5', '@10'].map((m) => (
//         <CButton
//           key={m}
//           style={{
//             width: 85,
//             height: 25,
//             fontSize: 16,
//             backgroundColor: '#FC842F',
//             opacity: current === m ? 1 : 0.7,
//             border: 'none',
//             padding: 0,
//           }}
//           onClick={() => onChange(m)}
//         >
//           Metric{m}
//         </CButton>
//       ))}
//     </div>
//   );

//   // Select evaluation data based on current metric
//   const currentData = selectedMetric === 'completeness' ? completenessData : consistencyData;

//   // Common styles
//   const commonStyles = {
//     card: { borderRadius: 20, backgroundColor: 'rgba(0, 113, 188, 0.6)', fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'white', border: 'none', marginBottom: 8 },
//     table: { borderRadius: 8, overflow: 'hidden' },
//     textBold: { fontWeight: 500 },
//     flexRow: { display: 'flex', alignItems: 'center', gap: 15 },
//     progressContainer: { flexGrow: 1, display: 'flex', alignItems: 'center', gap: 8 },
//     progressValue: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px', fontWeight: 500, fontSize: 16, lineHeight: '150%', color: '#FFFFFF', borderRadius: 8, flexShrink: 0, minWidth: 50 },
//     progressBar: { flexGrow: 1, height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 },
//     progressFill: { height: '100%', borderRadius: 4 },
//   };

//   // Render dashboard layout
//   return (
//     <div style={{ marginTop: 64, paddingTop: 8, paddingBottom: 12, fontFamily: 'Inter, sans-serif' }}>
//       {/* Header with dataset update button and search bar */}
//       {/* Header with dataset update button and search bar */}
//       <CRow className="align-items-center mb-3">
//         <CCol xs="auto">
//           <CButton
//             onClick={handleUpdateDataset}
//             style={{ backgroundColor: '#009990', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, borderColor: '#009990', display: 'flex', alignItems: 'center', }}
//           >
//             <CIcon icon={cilLoopCircular} style={{ width: 25, height: 25 }} className="me-2" />
//             Update dataset
//           </CButton>
//         </CCol>
//         {/* <CCol xs="auto">
//           <CButton
//             onClick={handleExportReport}
//             style={{
//               backgroundColor: '#0066cc', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, borderColor: '#0066cc', display: 'flex', alignItems: 'center',
//             }}
//           >
//             <CIcon icon={cilSpreadsheet} style={{ width: 25, height: 25 }} className="me-2" />
//             Export Report
//           </CButton>
//         </CCol> */}

//         <CCol>
//           <CInputGroup>
//             <CFormInput type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//             <CButton type="button" color="secondary">
//               <CIcon icon={cilMagnifyingGlass} />
//             </CButton>
//           </CInputGroup>
//         </CCol>
//       </CRow>

//       {/* Dataset Information and Descriptive Statistics */}
//       <CCard style={commonStyles.card}>
//         <CCardHeader style={commonStyles.textBold}>Dataset Information</CCardHeader>
//         <CCardBody style={{ padding: 12, paddingTop: 0, paddingBottom: 0 }}>
//           {/* Dataset metrics table with mapped keys */}
//           <CTable responsive style={commonStyles.table}>
//             <CTableBody>
//               {Object.keys(keyMap).map((key) => (
//                 <CTableRow key={key}>
//                   <CTableHeaderCell scope="row" style={commonStyles.textBold}>{key}:</CTableHeaderCell>
//                   <CTableDataCell className="text-end">{datasetInfo[keyMap[key]]}</CTableDataCell>
//                 </CTableRow>
//               ))}
//             </CTableBody>
//           </CTable>
//           <h5 style={{ fontSize: 18, fontWeight: 500, marginTop: 0, marginBottom: 12 }}>Descriptive Statistics</h5>
//           <CTable striped bordered responsive style={commonStyles.table}>
//             <CTableHead>
//               <CTableRow>
//                 <CTableHeaderCell scope="col" style={commonStyles.textBold}>Statistic</CTableHeaderCell>
//                 {Object.keys(descriptiveStatistics).map((colName) => (
//                   <CTableHeaderCell key={colName} scope="col" style={commonStyles.textBold}>{colName}</CTableHeaderCell>
//                 ))}
//               </CTableRow>
//             </CTableHead>
//             <CTableBody>
//               {['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'].map((stat) => (
//                 <CTableRow key={stat}>
//                   <CTableHeaderCell scope="row" style={commonStyles.textBold}>{stat}</CTableHeaderCell>
//                   {Object.values(descriptiveStatistics).map((colStats, i) => (
//                     <CTableDataCell key={i}>{colStats[stat]?.toFixed(2) || '-'}</CTableDataCell>
//                   ))}
//                 </CTableRow>
//               ))}
//             </CTableBody>
//           </CTable>
//         </CCardBody>
//       </CCard>

//       {/* Data Visualization Section */}
//       <CCard style={{ ...commonStyles.card, height: 400, overflow: 'hidden', marginTop: 0 }}>
//         <CCardHeader style={commonStyles.textBold}>Data Visualization</CCardHeader>
//         <CCardBody style={{ display: 'flex', gap: 8, height: 'calc(100% - 56px)', overflow: 'hidden', padding: 12, paddingTop: 0 }}>
//           {[
//             { title: 'Gender Distribution (%)', data: genderData, Component: MemoizedPie },
//             {
//               title: 'Top 10 Popular Fields',
//               data: fieldsData,
//               Component: MemoizedBar,
//               options: {
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} learners` } } },
//                 scales: { y: { beginAtZero: true, ticks: { stepSize: 20 } } },
//               },
//             },
//           ].map(({ title, data, Component, options }, i) => (
//             <div key={i} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 8, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//               <h6 style={{ marginBottom: 4, color: '#000', textAlign: 'center' }}>{title}</h6>
//               <div style={{ flex: 1, position: 'relative' }}>
//                 <Component data={data} options={options} />
//               </div>
//             </div>
//           ))}
//         </CCardBody>
//       </CCard>

//       {/* Direct and Indirect Evaluation Sections */}
//       <CRow style={{ '--bs-gutter-x': '0.25rem' }}>
//         {/* Direct Evaluation: Completeness and Consistency */}
//         <CCol xs={6} style={{ paddingRight: 4 }}>
//           <CCard style={{ border: '1px solid #828282', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 16, height: 1200, overflowY: 'auto', width: '100%' }}>
//             {/* Sticky header for Direct Evaluation */}
//             <CCardHeader style={{ fontSize: 18, fontWeight: 700, color: 'black', textAlign: 'center', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
//               DIRECT EVALUATION
//             </CCardHeader>
//             <CCardBody style={{ padding: '20px 20px 15px' }}>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
//                 {[
//                   { metric: 'completeness', label: 'Completeness:', data: completenessData },
//                   { metric: 'consistency', label: 'Consistency:', data: consistencyData },
//                 ].map(({ metric, label, data }) => (
//                   <div key={metric} style={commonStyles.flexRow}>
//                     <CButton
//                       onClick={() => setSelectedMetric(metric)}
//                       style={{
//                         backgroundColor: '#FC842F',
//                         color: '#000',
//                         border: 'none',
//                         opacity: selectedMetric === metric ? 1 : 0.7,
//                         transition: 'opacity 0.3s ease',
//                         fontWeight: 500,
//                         fontSize: 16,
//                         lineHeight: '150%',
//                         padding: '5px 10px',
//                         borderRadius: 5,
//                         flex: '0 0 160px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       {label}
//                     </CButton>
//                     <div style={commonStyles.progressContainer}>
//                       <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(data.overallPassRate) }}>
//                         {data.overallPassRate}%
//                       </span>
//                       <div style={commonStyles.progressBar}>
//                         <div style={{ ...commonStyles.progressFill, width: `${data.overallPassRate}%`, backgroundColor: getProgressColor(data.overallPassRate) }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Definition of selected metric */}
//               <div style={{ backgroundColor: 'rgba(0, 113, 188, 0.5)', borderRadius: 8, padding: 15, marginBottom: 20 }}>
//                 <h3 style={{ fontSize: 20, fontWeight: 600, lineHeight: '150%', color: '#000', textAlign: 'center', margin: '0 0 10px' }}>
//                   {currentData.definition.title}
//                 </h3>
//                 {selectedMetric === 'completeness' ? (
//                   <>
//                     <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', margin: '0 0 10px' }}>
//                       <strong style={{ fontWeight: 600 }}>{currentData.definition.text.completeness.term}</strong> {currentData.definition.text.completeness.definition}
//                     </p>
//                     <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', margin: 0 }}>
//                       <strong style={{ fontWeight: 600 }}>{currentData.definition.text.approach.term}</strong> {currentData.definition.text.approach.definition}
//                     </p>
//                   </>
//                 ) : (
//                   <div>
//                     <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', margin: '0 0 10px' }} dangerouslySetInnerHTML={{ __html: currentData.definition.text.intro }} />
//                     <p style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', margin: '0 0 8px' }}>{currentData.definition.text.heading}</p>
//                     <ul style={{ listStyle: 'none', padding: '0 0 0 20px', margin: 0 }}>
//                       {currentData.definition.text.criteria.map((item, i) => (
//                         <li key={i} style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', marginBottom: 5 }}>
//                           <em style={{ fontStyle: 'italic', fontWeight: 600 }}>{item.name}</em>: {item.description}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div style={{ borderTop: '2px dashed #828282', margin: '20px 0' }} />

//               {/* Evaluation results and error log */}
//               <div>
//                 <h3 style={{ fontSize: 20, fontWeight: 600, lineHeight: '150%', color: '#000', textAlign: 'center', margin: '0 0 20px' }}>Results</h3>
//                 <div style={{ marginBottom: 20 }}>
//                   {selectedMetric === 'completeness' ? (
//                     <div style={commonStyles.flexRow}>
//                       <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', minWidth: 120 }}>Pass Rate:</span>
//                       <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(currentData.overallPassRate) }}>
//                         {currentData.overallPassRate}%
//                       </span>
//                       <div style={commonStyles.progressBar}>
//                         <div style={{ ...commonStyles.progressFill, width: `${currentData.overallPassRate}%`, backgroundColor: getProgressColor(currentData.overallPassRate) }}></div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                       <div style={commonStyles.flexRow}>
//                         <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', minWidth: 120 }}>Total Pass Rate:</span>
//                         <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(currentData.overallPassRate) }}>
//                           {currentData.overallPassRate}%
//                         </span>
//                         <div style={commonStyles.progressBar}>
//                           <div style={{ ...commonStyles.progressFill, width: `${currentData.overallPassRate}%`, backgroundColor: getProgressColor(currentData.overallPassRate) }}></div>
//                         </div>
//                       </div>
//                       {currentData.criterionPassRates.map((criterion) => (
//                         <div key={criterion.name} style={{ display: 'flex', alignItems: 'center', gap: 15, paddingTop: 10, borderTop: '1px solid #E0E0E0' }}>
//                           <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '150%', color: '#000', flex: '0 0 140px' }}>{criterion.name}</span>
//                           <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(criterion.passRate) }}>
//                             {criterion.passRate}%
//                           </span>
//                           <div style={commonStyles.progressBar}>
//                             <div style={{ ...commonStyles.progressFill, width: `${criterion.passRate}%`, backgroundColor: getProgressColor(criterion.passRate) }}></div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <h4 style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', margin: '0 0 10px' }}>Error Log:</h4>
//                 <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                   {currentData.errorLog.length > 0 ? (
//                     currentData.errorLog.map((error, i) => (
//                       <li
//                         key={i}
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           padding: '10px 0',
//                           borderTop: i !== 0 ? '1px solid #E0E0E0' : 'none',
//                           fontSize: 16,
//                           fontWeight: 400,
//                           lineHeight: '150%',
//                           color: '#000',
//                         }}
//                       >
//                         {error}
//                       </li>
//                     ))
//                   ) : (
//                     <li style={{ fontSize: 16, fontWeight: 400, lineHeight: '150%', color: '#555', padding: '10px 0' }}>
//                       No errors found for this metric.
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             </CCardBody>
//           </CCard>
//         </CCol>

//         {/* Indirect Evaluation: Reliability and Relevance */}
//         <CCol xs={6} style={{ paddingLeft: 4 }}>
//           <CCard
//             style={{
//               boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
//               fontFamily: 'Inter',
//               width: '100%',
//               height: '1200px',
//               backgroundColor: '#fff',
//               border: '1px solid #828282',
//               borderRadius: 16,
//             }}
//           >
//             <CCardHeader style={{ fontSize: 18, fontWeight: 700, color: 'black', textAlign: 'center' }}>
//               INDIRECT EVALUATION
//             </CCardHeader>
//             <CCardBody style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', padding: 12 }}>

//               {/* === Reliability Section === */}
//               <div
//                 style={{
//                   width: '98%',
//                   height: '25%',
//                   margin: '0 auto',
//                   backgroundColor: 'rgba(0, 113, 188, 0.6)',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   boxShadow: '0 0 4px rgba(0,0,0,0.1)',
//                   borderRadius: 8,
//                   padding: 6,
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//                   <span style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Reliability:</span>
//                   <MetricSwitch current={reliabilityMetric} onChange={setReliabilityMetric} />
//                 </div>
//                 <div style={{ width: '100%', height: '98%', margin: '0 auto', borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
//                   <MemoizedLine
//                     data={{
//                       labels: reliabilityData[reliabilityMetric].labels,
//                       datasets: reliabilityData[reliabilityMetric].datasets.map((ds) => ({
//                         ...ds,
//                         fill: false,
//                         pointRadius: 5,
//                         pointHoverRadius: 7,
//                         backgroundColor: ds.borderColor,
//                       })),
//                     }}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: { position: 'top' },
//                         tooltip: {
//                           callbacks: {
//                             label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`,
//                           },
//                         },
//                       },
//                       scales: {
//                         y: {
//                           beginAtZero: true,
//                           max: 0.3,
//                           ticks: {
//                             stepSize: 0.05,
//                             callback: (v) => `${(v * 100).toFixed(0)}%`,
//                           },
//                           title: {
//                             display: true,
//                             text: 'MAP',
//                             font: { weight: 'bold' },
//                           },
//                         },
//                         x: {
//                           title: {
//                             display: true,
//                             text: 'Dataset Version',
//                             font: { weight: 'bold' },
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* === Relevance Section === */}
//               <div
//                 style={{
//                   width: '98%',
//                   height: '75%', // ~75% trừ padding/gap
//                   margin: '0 auto',
//                   backgroundColor: 'rgba(0, 113, 188, 0.6)',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   boxShadow: '0 0 4px rgba(0,0,0,0.1)',
//                   borderRadius: 8,
//                   padding: 6,
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//                   <span style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Relevance:</span>
//                   <MetricSwitch current={relevanceMetric} onChange={setRelevanceMetric} />
//                 </div>
//                 <div style={{ width: '100%', height: '100%', margin: '0 auto', borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
//                   {['Precision', 'Recall', 'NDCG'].map((metricType, idx) => (
//                     <React.Fragment key={metricType}>
//                       <div
//                         style={{
//                           width: '100%',
//                           height: '31%',
//                           borderRadius: 8,
//                           backgroundColor: '#fff',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           padding: 6,
//                           boxShadow: '0 0 2px rgba(0,0,0,0.05)',
//                         }}
//                       >
//                         <MemoizedLine
//                           data={{
//                             labels: relevanceData[relevanceMetric].labels,
//                             datasets: relevanceData[relevanceMetric][metricType].map((ds) => ({
//                               ...ds,
//                               fill: false,
//                               pointRadius: 5,
//                               pointHoverRadius: 7,
//                               backgroundColor: ds.borderColor,
//                             })),
//                           }}
//                           options={{
//                             responsive: true,
//                             maintainAspectRatio: false,
//                             plugins: {
//                               legend: { position: 'top' },
//                               tooltip: {
//                                 callbacks: {
//                                   label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`,
//                                 },
//                               },
//                             },
//                             scales: {
//                               y: {
//                                 beginAtZero: true,
//                                 max: 0.3,
//                                 ticks: {
//                                   stepSize: 0.05,
//                                   callback: (v) => `${(v * 100).toFixed(0)}%`,
//                                 },
//                                 title: {
//                                   display: true,
//                                   text: metricType,
//                                   font: { weight: 'bold' },
//                                 },
//                               },
//                               x: {
//                                 title: {
//                                   display: true,
//                                   text: 'Dataset Version',
//                                   font: { weight: 'bold' },
//                                 },
//                               },
//                             },
//                           }}
//                         />
//                       </div>
//                       {idx < 2 && (
//                         <div
//                           style={{
//                             height: 1,
//                             backgroundColor: '#ccc',
//                             opacity: 0.4,
//                             borderStyle: 'dashed',
//                             borderWidth: 0,
//                             borderTopWidth: 1,
//                             margin: '8px 0',
//                           }}
//                         />
//                       )}
//                     </React.Fragment>
//                   ))}

//                 </div>
//               </div>
//             </CCardBody>
//           </CCard>
//         </CCol>

//       </CRow>
//       {/* Line chart for Model Performance Overview */}
//       <CCard style={{ borderRadius: 20, backgroundColor: '#fff', border: '1px solid #828282', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', marginTop: 12, }}>
//         <CCardHeader style={{ fontSize: 18, fontWeight: 700, color: 'black', textAlign: 'center' }}>
//           MODELS PERFORMANCE OVERVIEW
//         </CCardHeader>
//         <CCardBody style={{
//           padding: 16,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 12
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '100%',
//             maxWidth: 900,
//           }}>
//             <span style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>F1-score across Dataset Versions</span>
//             <MetricSwitch current={f1Metric} onChange={setF1Metric} />
//           </div>
//           <div style={{
//             width: '100%',
//             maxWidth: 900,
//             height: 320,
//             backgroundColor: '#ffffff',
//             borderRadius: 8,
//             padding: 8,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//             <MemoizedLine
//               data={{
//                 labels: f1ScoreData[f1Metric].labels,
//                 datasets: f1ScoreData[f1Metric].datasets.map((ds) => ({
//                   ...ds,
//                   backgroundColor: ds.borderColor,
//                   fill: false,
//                   pointRadius: 5,
//                   pointHoverRadius: 7,
//                 })),
//               }}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: { position: 'top' },
//                   tooltip: {
//                     callbacks: {
//                       label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`
//                     }
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     max: 0.3,
//                     ticks: {
//                       stepSize: 0.05,
//                       callback: (v) => `${(v * 100).toFixed(0)}%`,
//                     },
//                     title: {
//                       display: true,
//                       text: 'F1-score',
//                       font: { weight: 'bold' },
//                     },
//                   },
//                   x: {
//                     title: {
//                       display: true,
//                       text: 'Dataset Version',
//                       font: { weight: 'bold' },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </CCardBody>
//       </CCard>
//     </div>
//   );
// };

// export default PersonalizedLearning;