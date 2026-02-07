
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
      
      {/* Logo / Project Name */}
      <Link to="/" className="text-xl font-bold">
        Hostel Complaint System
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8 text-lg">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link to="/about" className="hover:text-blue-400">
          About
        </Link>

        <Link to="/contact" className="hover:text-blue-400">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;