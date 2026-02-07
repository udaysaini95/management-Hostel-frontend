import { useState } from "react"
import { UploadCloud } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const RaiseComplaint = () => {
   const Navigate =useNavigate();
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

      await axios.post(
  "http://localhost:5000/api/complaints/create",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
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
      alert("❌ Failed to submit complaint")
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          🛠 Raise a Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TYPE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Complaint Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option>Electrical</option>
              <option>Housekeeping</option>
              <option>Internet / WiFi</option>
              <option>Mess / Food</option>
              <option>Others</option>
            </select>
          </div>

          {/* ROOM */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Room Number
            </label>
            <input
              type="text"
              name="room"
              value={form.room}
              onChange={handleChange}
              placeholder="B-205"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* IMAGE */}
          <div className="border border-dashed rounded-lg p-4 text-center">
            <label className="flex flex-col items-center cursor-pointer text-gray-500">
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
              <p className="text-xs mt-2 text-green-600">
                {form.image.name}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RaiseComplaint
