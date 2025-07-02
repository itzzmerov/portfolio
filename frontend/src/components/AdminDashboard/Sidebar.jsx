import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block py-3 px-4 text-lg font-bold font-titillium rounded hover:bg-custom-white hover:text-custom-darkish-blue ${isActive ? "bg-custom-white text-custom-darkish-blue font-bold" : "text-custom-white"
    }`;

  return (
    <aside className="w-64 bg-custom-darkish-blue shadow-md flex flex-col p-4">
      <h2 className="text-2xl font-bold font-montserrat mt-5 mb-8 text-custom-white text-center">itzzmerov</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin/dashboard/hero" className={linkClasses}>
          Hero
        </NavLink>
        <NavLink to="/admin/dashboard/about" className={linkClasses}>
          About
        </NavLink>
        <NavLink to="/admin/dashboard/services" className={linkClasses}>
          Services
        </NavLink>
        <NavLink to="/admin/dashboard/works" className={linkClasses}>
          Works
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
