import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://rovidev.pythonanywhere.com/api/login/", {
        username,
        password,
      });

      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Redirect to AdminDashboard
      navigate("/admin/dashboard/hero");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFFAFD]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-custom-darkish-blue">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border-2 border-custom-darkish-blue rounded-md p-3 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-2 border-custom-darkish-blue rounded-md p-3 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-custom-darkish-blue text-white font-semibold py-3 rounded-md hover:bg-custom-dark-pink transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
