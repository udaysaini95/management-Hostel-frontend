import axios from "axios"
import { useEffect, useState } from "react"

function AdminLeaves() {

    const [leaves, setLeaves] = useState([])

    const load = async () => {
        const token = localStorage.getItem("token")

        const res = await axios.get(
            "http://localhost:5000/api/leave/admin/all",
            { headers: { Authorization: `Bearer ${token}` } }
        )
        console.log("Admin Leaves Response:", res.data); // Debugging log
        setLeaves(res.data)
    }

    useEffect(() => { load() }, [])

    const approve = async (id) => {
        const token = localStorage.getItem("token")

        await axios.put(
            `http://localhost:5000/api/leave/admin/approve/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )

        load()
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h2 className="text-2xl font-bold mb-6">
                Leave Approval Panel
            </h2>

            <div className="grid gap-4">

                {leaves.map(l => (
                    <div
                        key={l._id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >

                        <div>
                            <p className="font-semibold">
                                👨 Student: {l.student?.name}
                            </p>

                            <p>Reason: {l.reason}</p>
                            <p>From: {l.fromDate}</p>
                            <p>To: {l.toDate}</p>

                            <p className={
                                l.status === "Approved"
                                    ? "text-green-600 font-bold"
                                    : "text-orange-500"
                            }>
                                Status: {l.status}
                            </p>
                        </div>

                        {l.status === "Pending" ? (
                            <button
                                onClick={() => approve(l._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                ✔ Approve
                            </button>
                        ) : (
                            <span className="text-green-600 font-semibold">
                                Digitally Signed ✅
                            </span>
                        )}

                    </div>
                ))}

            </div>

        </div>
    )
}

export default AdminLeaves
