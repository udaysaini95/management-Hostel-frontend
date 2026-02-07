import RoleCard from "./components/RoleCard";

const Home = () => {
  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-10">
        Welcome to the Hostel Complaint System
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* STUDENT CARD */}
        <RoleCard
          title="Student"
          image="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          loginPath="/student/login"
          registerPath="/student/register"
        />

        {/* ADMIN CARD */}
        <RoleCard
          title="Admin"
          image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          loginPath="/admin/login"
          registerPath="/admin/register"
        />

      </div>
    </div>
  );
};

export default Home;
