import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DataChart = ({ chartData, chartOptions }) => {
  return (
    <CCard className="data-chart">
      <CCardHeader className="chart-title">Bar chart of missing values by column</CCardHeader>
      <CCardBody className='data-chart-container'>
        <Bar data={chartData} options={{chartOptions,  maintainAspectRatio: false}} />
      </CCardBody>
    </CCard>
  )
}

export default DataChart
