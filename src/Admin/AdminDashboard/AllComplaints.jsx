import { useEffect, useState } from "react"
import axios from "axios"

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)
    setError("")

    try {
      const res = await axios.get(
   "http://localhost:5000/api/complaints/admin/complaints",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setComplaints(res.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch complaints")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token")

    try {
      await axios.put(
        `http://localhost:5000/api/complaints/status/${id}`,
    { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      fetchComplaints() // refresh after update
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">All Complaints</h2>

      {loading && <p className="text-gray-500 mb-4">Loading complaints...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Room</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 && !loading && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No complaints found
                </td>
              </tr>
            )}

            {complaints.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{c.user?.name || "N/A"}</td>
                <td className="px-4 py-2">{c.user?.email || "N/A"}</td>
                 <td className="px-4 py-2">{c.room}</td>
                 <td className="px-4 py-2">{c.type}</td>
                <td className="px-4 py-2">{c.description}</td>
                <td className="px-4 py-2">
                  {c.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${c.image}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2">
                 <select
  value={c.status}
  onChange={(e)=>updateStatus(c._id,e.target.value)}
>
  <option>Created</option>
  <option>Assigned</option>
  <option>In Progress</option>
  <option>Resolved</option>
</select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllComplaints
