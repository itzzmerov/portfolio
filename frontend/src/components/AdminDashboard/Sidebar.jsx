import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block py-3 px-4 rounded hover:bg-custom-darkish-blue hover:text-white ${
      isActive ? "bg-custom-darkish-blue text-white" : "text-custom-darkish-blue"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6 text-custom-darkish-blue">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin/dashboard/hero" className={linkClasses}>
          Hero
        </NavLink>
        <NavLink to="/admin/dashboard/about" className={linkClasses}>
          About
        </NavLink>
        <NavLink to="/admin/dashboard/works" className={linkClasses}>
          Works
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
