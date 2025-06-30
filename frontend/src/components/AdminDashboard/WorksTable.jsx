import { useEffect, useState } from "react";
import axios from "axios";

const WorksTable = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("authToken");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/projects/");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/projects/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Error deleting project.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-custom-darkish-blue mb-4">
        Projects
      </h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2 space-x-2">
                {/* You can add edit functionality */}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorksTable;
