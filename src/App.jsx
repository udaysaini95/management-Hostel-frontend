import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Home/components/Navbar";
import StudentLogin from "./Student/Login";
import StudentRegister from "./Student/Register";
import AdminLogin from "./Admin/Login";
import AdminRegister from "./Admin/Register";
import StudentDashboard from "./Student/Dashboard/StudentDashboard";
import RaiseComplaint from "./Student/Dashboard/RaiseComplaint";
import MyComplaints from "./Student/Dashboard/MyComplaints";
import ApplyLeave from "./Student/Dashboard/ApplyLeave";
import MyLeaves from "./Student/Dashboard/MyLeaves";
import MessPage from "./Student/Dashboard/MessPage";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import AllComplaints from "./Admin/AdminDashboard/AllComplaints";
import ViewReports from "./Admin/AdminDashboard/ViewReports";
import AdminLeaves from "./Admin/AdminDashboard/AdminLeaves";
import CreateMenu from "./Admin/AdminDashboard/MessCreate";
import MessAnalytics from "./Admin/AdminDashboard/MessAnalytics";
import AdminLayout from "./Admin/AdminDashboard/AdminLayout";


function App() {

  const location = useLocation();

  // Jahan Navbar hide karna ho
  // Modified to hide public navbar on all /admin and /student routes
  const shouldHideNavbar = location.pathname.startsWith("/admin") || location.pathname.startsWith("/student");

  // Import AdminLayout - We need to import it first
  // Note: I will add the import at the top in a separate edit if needed, 
  // but for now let's assume I can't add imports with this tool easily without replacing the whole file.
  // Actually, I should use the wrapper component approach directly in the element prop.

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/raise-complaint" element={<RaiseComplaint />} />
        <Route path="/student/my-complaints" element={<MyComplaints />} />
        <Route path="/student/Leaves" element={<ApplyLeave />} />
        <Route path="/student/myleave" element={<MyLeaves />} />
        <Route path="/student/messpage" element={<MessPage />} />

        {/* Admin Routes - Wrapped in AdminLayout */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/Allcomplaints" element={<AdminLayout><AllComplaints /></AdminLayout>} />
        <Route path="/admin/reports" element={<AdminLayout><ViewReports /></AdminLayout>} />
        <Route path="/admin/Leaves" element={<AdminLayout><AdminLeaves /></AdminLayout>} />
        <Route path="/admin/createmenu" element={<AdminLayout><CreateMenu /></AdminLayout>} />
        <Route path="/admin/messAnalytics" element={<AdminLayout><MessAnalytics /></AdminLayout>} />

      </Routes>
    </>
  );
}

export default App;
