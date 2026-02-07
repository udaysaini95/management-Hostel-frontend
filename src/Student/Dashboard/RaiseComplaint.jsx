import { useState } from "react"
import { UploadCloud, CheckCircle, XCircle } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const RaiseComplaint = () => {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    type: "",
    room: "",
    description: "",
    image: null
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] })
  }

  // ✅ SUBMIT TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      const formData = new FormData()
      formData.append("type", form.type)
      formData.append("room", form.room)
      formData.append("description", form.description)
      if (form.image) {
        formData.append("image", form.image)
      }

      // Fixed endpoint from /api/complaint/create to /api/complaints/create
      await axios.post(
        "http://localhost:5000/api/complaints/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
            // Content-Type: "multipart/form-data" // ❌ Remove this manual header, axios sets it with boundary
          }
        }
      )

      alert("✅ Complaint submitted successfully")
      Navigate("/student/my-complaints");
      setForm({
        type: "",
        room: "",
        description: "",
        image: null
      })

    } catch (error) {
      console.log(error)
      const errorMsg = error.response?.data?.message || error.message || "Failed to submit complaint"
      alert(`❌ Error: ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setForm({
      type: "",
      room: "",
      description: "",
      image: null
    })
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative flex items-center justify-center p-6">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/90 z-0"></div>

      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          🛠 Raise <span className="text-blue-400">Complaint</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TYPE */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Complaint Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 appearance-none"
            >
              <option value="" className="bg-slate-800 text-gray-400">Select Type</option>
              <option className="bg-slate-800">Electrical</option>
              <option className="bg-slate-800">Housekeeping</option>
              <option className="bg-slate-800">Internet / WiFi</option>
              <option className="bg-slate-800">Mess / Food</option>
              <option className="bg-slate-800">Others</option>
            </select>
          </div>

          {/* ROOM */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Room Number
            </label>
            <input
              type="text"
              name="room"
              value={form.room}
              onChange={handleChange}
              placeholder="B-205"
              required
              className="w-full mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* IMAGE */}
          <div className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:bg-white/5 transition-colors cursor-pointer relative group">
            <label className="flex flex-col items-center cursor-pointer text-slate-400 group-hover:text-white transition-colors">
              <UploadCloud size={30} />
              <span className="text-sm mt-1">
                Upload Photo (optional)
              </span>
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            {form.image && (
              <p className="text-xs mt-2 text-green-400 font-bold">
                {form.image.name}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-white/10 text-slate-300 font-medium py-3 rounded-xl hover:bg-white/20 transition-all active:scale-95 border border-white/10"
            >
              Clear FORM
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RaiseComplaint
