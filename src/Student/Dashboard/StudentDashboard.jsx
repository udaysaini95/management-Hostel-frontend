import { useState } from "react";
import Sidebar from "./Studentcomponents/Sidebar";
import DashboardCard from "./Studentcomponents/DashboardCard";
import Topbar from "./Studentcomponents/Topbar";


const StudentDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* TOPBAR */}
      <Topbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex pt-16">
        {/* SIDEBAR */}
        <div
          className={`
          fixed md:static z-40
          ${showSidebar ? "block" : "hidden"}
          md:block
        `}
        >
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>

          <p className="text-gray-500 mb-10">
            Manage complaints easily with a modern interface.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <DashboardCard
              title="Raise a Complaint"
              desc="Submit complaints related to hostel facilities."
              btnText="Lodge Complaint"
              link="/student/raise-complaint"
            />

            {/* <DashboardCard
              title="My Complaints"
              desc="Track complaint history & raise new ones."
              btnText="View Complaints"
            /> */}
            <DashboardCard
              title="My Complaints"
              desc="Track complaint history & raise new ones."
              btnText="View Complaints"
              link="/student/my-complaints" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;