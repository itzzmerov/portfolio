import { useEffect, useState } from "react";
import axios from "axios";

const WorksTable = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    demo_url: "",
    code_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/projects/");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();

    // Close modal on Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowForm(false);
        setEditingId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/projects/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Error deleting project.");
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      image: null,
      demo_url: project.demo_url || "",
      code_url: project.code_url || "",
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setForm({
      title: "",
      description: "",
      image: null,
      demo_url: "",
      code_url: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("demo_url", form.demo_url);
    formData.append("code_url", form.code_url);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await axios.patch(
          `http://localhost:8000/api/projects/${editingId}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Project updated successfully.");
      } else {
        await axios.post(`http://localhost:8000/api/projects/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Project created successfully.");
      }
      fetchProjects();
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Error saving project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-custom-darkish-blue">
          Projects
        </h2>
        <button
          onClick={handleAddNew}
          className="bg-custom-darkish-blue text-white px-4 py-2 rounded"
        >
          + Add New Project
        </button>
      </div>
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
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-500"
                >
                  Edit
                </button>
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

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="demo_url"
                placeholder="Demo URL"
                value={form.demo_url}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="code_url"
                placeholder="Code URL"
                value={form.code_url}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-custom-darkish-blue text-white px-4 py-2 rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="text-gray-500 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksTable;
