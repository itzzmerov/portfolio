import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PortfolioLayout from "./components/PortfolioLayout";
import Login from "./components/AdminDashboard/Login";
import AdminDashboardLayout from "./components/AdminDashboard/AdminDashboardLayout";
import HeroForm from "./components/AdminDashboard/HeroForm";
import AboutForm from "./components/AdminDashboard/AboutForm";
import WorksTable from "./components/AdminDashboard/WorksTable";
import ServicesForm from "./components/AdminDashboard/ServicesForm";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ScrollAOSRefresher() {
  // call AOS.refresh() when route changes (optional)
  const location = useLocation();
  useEffect(() => {
    AOS.refresh();
  }, [location]);
  return null;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
      mirror: false,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/portfolio" element={<PortfolioLayout />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
          <Route path="hero" element={<HeroForm />} />
          <Route path="about" element={<AboutForm />} />
          <Route path="works" element={<WorksTable />} />
          <Route path="services" element={<ServicesForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
