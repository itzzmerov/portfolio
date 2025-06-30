import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  return (
    <div className="bg-white shadow flex justify-between items-center px-6 py-4">
      <h1 className="text-lg font-semibold text-custom-darkish-blue">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-custom-dark-pink text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default TopNavbar;
