import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Home/components/Navbar";
import StudentLogin from "./Student/Login";
import StudentRegister from "./Student/Register";

function App() {

  const location = useLocation();

  // Jahan Navbar hide karna ho



  return (
    <>
       <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

      </Routes>
    </>
  );
}

export default App;
