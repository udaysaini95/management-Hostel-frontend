import axios from "axios"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"

function MyLeaves(){

 const [leaves,setLeaves]=useState([])

 useEffect(()=>{
  loadLeaves()
 },[])

 const loadLeaves = async()=>{
  const token = localStorage.getItem("token")

  const res = await axios.get(
   "http://localhost:5000/api/leave/mine",
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  setLeaves(res.data)
 }

 // PDF DOWNLOAD
 const downloadSlip = (leave)=>{
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text("HOSTEL LEAVE APPROVAL SLIP",20,20)

  doc.setFontSize(12)
  doc.text(`Reason : ${leave.reason}`,20,40)
  doc.text(`From Date : ${leave.fromDate}`,20,50)
  doc.text(`To Date : ${leave.toDate}`,20,60)
  doc.text(`Status : ${leave.status}`,20,70)

  doc.save("leave-slip.pdf")
 }

 return(
 <div className="p-6">

  <h2 className="text-2xl font-bold mb-4">
   My Leave Requests
  </h2>

  <table className="w-full border">

   <thead className="bg-gray-200">
    <tr>
     <th>Reason</th>
     <th>From</th>
     <th>To</th>
     <th>Status</th>
     <th>Slip</th>
    </tr>
   </thead>

   <tbody>

   {leaves.map(l=>(
    <tr key={l._id} className="text-center border">

     <td>{l.reason}</td>
     <td>{l.fromDate}</td>
     <td>{l.toDate}</td>

     <td>
      <span className={
       l.status==="Approved"
       ? "text-green-600 font-bold"
       : "text-orange-500"
      }>
       {l.status}
      </span>
     </td>

     <td>
      {l.status==="Approved" &&
       <button
        onClick={()=>downloadSlip(l)}
        className="bg-green-600 text-white px-3 py-1 rounded"
       >
        Download
       </button>
      }
     </td>

    </tr>
   ))}

   </tbody>

  </table>

 </div>
 )
}

export default MyLeaves
