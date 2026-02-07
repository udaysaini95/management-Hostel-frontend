import { useEffect,useState } from "react"
import axios from "axios"

const MessAnalytics = ()=>{

 const [data,setData]=useState({})

 useEffect(()=>{
  load()
 },[])

 const load = async()=>{
  const token = localStorage.getItem("token")
const res = await axios.get(
 "http://localhost:5000/api/mess-feedback/admin",
 { headers:{ Authorization:`Bearer ${token}` } }
)


  setData(res.data)
 }

 return(
  <div className="p-8">
    <h2 className="text-2xl font-bold">Mess Analytics</h2>

    <p>Total Feedbacks: {data.totalFeedbacks}</p>
    <p>Average Rating: ⭐ {data.averageRating}</p>
  </div>
 )
}

export default MessAnalytics
