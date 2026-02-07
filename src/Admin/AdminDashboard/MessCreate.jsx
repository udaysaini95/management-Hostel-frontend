import { useState } from "react"
import axios from "axios"

const CreateMenu = () => {

  const [form, setForm] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: ""
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const saveMenu = async () => {
    const token = localStorage.getItem("token")

    await axios.post(
      "http://localhost:5000/api/mess/admin/create",
      {
        date: form.date,
        breakfast: form.breakfast.split(","),
        lunch: form.lunch.split(","),
        dinner: form.dinner.split(",")
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    alert("Menu Saved Successfully ✅")
  }

  return (
    <div className="max-w-xl p-8">

      <h2 className="text-2xl font-bold mb-5">
        Create Today's Menu
      </h2>

      <input type="date" name="date" onChange={handleChange} />

      <input name="breakfast"
        placeholder="Poha,Tea"
        onChange={handleChange}
      />

      <input name="lunch"
        placeholder="Rice,Dal,Paneer"
        onChange={handleChange}
      />

      <input name="dinner"
        placeholder="Roti,Sabji"
        onChange={handleChange}
      />

      <button
        onClick={saveMenu}
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        Save Menu
      </button>

    </div>
  )
}

export default CreateMenu
