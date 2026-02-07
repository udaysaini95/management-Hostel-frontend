import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Home/components/Navbar";
import StudentLogin from "./Student/Login";
import StudentRegister from "./Student/Register";
import AdminLogin from "./Admin/Login";
import AdminRegister from "./Admin/Register";
import StudentDashboard from "./Student/Dashboard/StudentDashboard";

function App() {

  // const location = useLocation();

  // Jahan Navbar hide karna ho
 const hideNavbarRoutes = [
    "/student/dashboard", "/admin/dashboard"
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/register" element={<AdminRegister />} />

        <Route path="/student/dashboard" element={<StudentDashboard/>} />
        
      </Routes>
    </>
  );
}

export default App;
