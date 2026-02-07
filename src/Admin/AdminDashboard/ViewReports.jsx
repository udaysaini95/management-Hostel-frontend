import axios from "axios"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const ViewReports = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  // ================= FETCH COMPLAINTS =================
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          "http://localhost:5000/api/complaints/admin/complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setComplaints(res.data)
      } catch (err) {
        console.log("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  // ================= ANALYTICS =================
  const total = complaints.length
  const resolved = complaints.filter(c => c.status === "Resolved").length
  const pending = complaints.filter(c => c.status === "Pending").length
  const inProgress = complaints.filter(c => c.status === "In Progress").length

  const categoryCount = complaints.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1
    return acc
  }, {})

  const chartData = Object.keys(categoryCount).map(key => ({
    category: key,
    count: categoryCount[key]
  }))

  // ================= PDF EXPORT =================
  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a4")

    // Title
    doc.setFontSize(18)
    doc.text("Hostel Complaints Report", 14, 20)

    // Date
    doc.setFontSize(11)
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 28)

    // Summary
    doc.setFontSize(12)
    doc.text(`Total Complaints: ${total}`, 14, 40)
    doc.text(`Resolved: ${resolved}`, 14, 47)
    doc.text(`Pending: ${pending}`, 14, 54)
    doc.text(`In Progress: ${inProgress}`, 14, 61)

    // Table
    autoTable(doc, {
      startY: 70,
      head: [["ID", "Type", "Room", "Description", "Date", "Status"]],
      body: complaints.map(c => [
        c._id,
        c.type,
        c.room,
        c.description,
        new Date(c.createdAt).toLocaleDateString(),
        c.status
      ])
    })

    doc.save("complaints_report.pdf")
  }

  if (loading) {
    return <p className="text-center mt-10">Loading Reports...</p>
  }

  return (
    <div className="min-h-screen p-10 bg-slate-100">

      <h2 className="text-2xl font-bold mb-6">View Reports</h2>

      {/* SUMMARY CARDS */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="text-center">
          <p className="text-gray-500">Total</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600">{resolved}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
        </div>

      </div>

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-4">Category Trends</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PDF BUTTON */}
      <button
        onClick={exportPDF}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Download PDF Report
      </button>

    </div>
  )
}

export default ViewReports
