import { useEffect, useState } from "react"
import axios from "axios"

const MyComplaints = () => {

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token")

  // ✅ FETCH MY COMPLAINTS
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setComplaints(res.data)
    } catch (error) {
      console.log(error)
      alert("Failed to load complaints")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  // ✅ DELETE COMPLAINT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return

    try {
      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // UI instant update
      setComplaints(prev => prev.filter(c => c._id !== id))

    } catch (error) {
      console.log(error)
      alert("Delete failed")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h2 className="text-2xl font-bold mb-8">My Complaints</h2>

      {complaints.length === 0 && (
        <p className="text-gray-500">No complaints raised yet.</p>
      )}

      <div className="space-y-6">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white p-6 rounded-xl shadow flex justify-between items-start"
          >

            <div>
              <p className="text-sm text-gray-400">{c._id}</p>

              <h3 className="font-semibold">{c.type}</h3>

              <p className="text-gray-600">
                Room: {c.room}
              </p>

              <p className="text-gray-500 text-sm">
                {c.description}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Raised on: {new Date(c.createdAt).toLocaleString()}
              </p>
              {/* 🧭 TIMELINE */}
<div className="mt-3 border-l-2 border-blue-500 pl-3 space-y-1">
  {c.timeline?.map((t, i) => (
    <div key={i} className="flex gap-2 text-sm text-gray-600">
      <span>🕒</span>
      <span>{new Date(t.time).toLocaleString()}</span>
      <span>-</span>
      <span className="font-medium">{t.status}</span>
    </div>
  ))}
</div>

            </div>

            <div className="flex flex-col items-end gap-3">
              <span
                className={`font-medium ${
                  c.status === "Resolved"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {c.status}
              </span>

              <button
                onClick={() => handleDelete(c._id)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyComplaints
