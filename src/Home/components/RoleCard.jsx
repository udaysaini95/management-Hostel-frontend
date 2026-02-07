import { Link } from "react-router-dom";

const RoleCard = ({ title, image, loginPath, registerPath }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-80 text-center">
      
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-32 h-32 mx-auto mb-4 object-contain"
      />

      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-4 justify-center">
        <Link
          to={loginPath}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </Link>

        <Link
          to={registerPath}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default RoleCard;

