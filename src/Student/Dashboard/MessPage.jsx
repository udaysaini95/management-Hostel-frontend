import axios from "axios"
import { useEffect, useState } from "react"

const MessPage = () => {

  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")

  useEffect(() => {
    loadMenu()
  }, [])

  // ================= LOAD MENU =================
  const loadMenu = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        "http://localhost:5000/api/mess/today",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setMenu(res.data)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // ================= SUBMIT FEEDBACK =================
  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:5000/api/mess-feedback/create",
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Feedback Submitted Successfully ✅")
      setRating("")
      setComment("")

    } catch (err) {
      console.log(err)
      alert("Error sending feedback")
    }
  }

  // ================= UI =================

  if (loading) return <p className="p-8">Loading Menu...</p>
  if (!menu) return <p className="p-8">No Menu Available Today</p>

  return (
    <div className="p-8 max-w-2xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-center">
        🍽️ Today's Mess Menu
      </h2>

      {/* Breakfast */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="text-xl font-semibold">🍳 Breakfast</h3>
        {menu.breakfast.map((i, idx) =>
          <p key={idx}>• {i}</p>
        )}
      </div>

      {/* Lunch */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="text-xl font-semibold">🍛 Lunch</h3>
        {menu.lunch.map((i, idx) =>
          <p key={idx}>• {i}</p>
        )}
      </div>

      {/* Dinner */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-xl font-semibold">🌙 Dinner</h3>
        {menu.dinner.map((i, idx) =>
          <p key={idx}>• {i}</p>
        )}
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-5 rounded shadow">

        <h3 className="text-xl font-bold mb-3">
          📝 Give Mess Feedback
        </h3>

        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write your feedback..."
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={submitFeedback}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Submit Feedback
        </button>

      </div>

    </div>
  )
}

export default MessPage
