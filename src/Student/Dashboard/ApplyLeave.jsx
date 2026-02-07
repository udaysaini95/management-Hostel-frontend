import axios from "axios"
import { useState } from "react"
import { Send, CalendarDays, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

function ApplyLeave() {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    leaveType: "Personal",
    emergency: false
  })
    
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!form.reason || !form.fromDate || !form.toDate) {
      alert("Please fill all required fields")
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:5000/api/leave/apply",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Leave Applied Successfully ✅")
          navigate("/student/myleave");
      setForm({
        reason: "",
        fromDate: "",
        toDate: "",
        leaveType: "Personal",
        emergency: false
      })

    } catch (err) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[420px]">

        <h2 className="text-2xl font-bold text-center mb-2">
          Leave Application
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Fill the form to request leave
        </p>

        {/* Leave Type */}
        <label className="text-sm font-medium">Leave Type</label>
        <select
          className="input mt-1"
          value={form.leaveType}
          onChange={e => setForm({ ...form, leaveType: e.target.value })}
        >
          <option>Personal</option>
          <option>Medical</option>
          <option>Emergency</option>
          <option>Family</option>
        </select>

        {/* Reason */}
        <label className="text-sm font-medium mt-4 block">
          Reason
        </label>

        <textarea
          className="input h-24 resize-none mt-1"
          placeholder="Write reason..."
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mt-4">

          <div>
            <label className="text-sm font-medium">From</label>
            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="date"
                className="input pl-10"
                value={form.fromDate}
                onChange={e => setForm({ ...form, fromDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">To</label>
            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="date"
                className="input pl-10"
                value={form.toDate}
                onChange={e => setForm({ ...form, toDate: e.target.value })}
              />
            </div>
          </div>

        </div>

        {/* Emergency */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={form.emergency}
            onChange={e =>
              setForm({ ...form, emergency: e.target.checked })
            }
          />
          <span className="text-sm">Mark as Emergency</span>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Send size={18} />
          {loading ? "Submitting..." : "Submit Leave"}
        </button>

      </div>
    </div>
  )
}

export default ApplyLeave
