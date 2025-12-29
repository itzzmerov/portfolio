import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const WorksTable = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    demo_url: "",
    code_url: "",
    categories: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const token = localStorage.getItem("authToken");
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchProjects = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        axios.get(`${apiKey}/projects/`),
        axios.get(`${apiKey}/categories/`),
      ]);
      setProjects(projectsRes.data);
      setAllCategories(categoriesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowForm(false);
        setEditingId(null);
        setImagePreviewUrl("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${apiKey}/projects/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchProjects();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Project has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete project.",
      });
    }
  };

  const handleEdit = (project) => {
    const categoryIds = project.categories?.map(cat => cat.id) || [];

    setForm({
      title: project.title || "",
      description: project.description || "",
      image: null,
      demo_url: project.demo_url || "",
      code_url: project.code_url || "",
      categories: categoryIds,
    });
    setEditingId(project.id);
    setShowForm(true);
    setImagePreviewUrl(project.image || "");
  };

  const handleAddNew = () => {
    setForm({
      title: "",
      description: "",
      image: null,
      demo_url: "",
      code_url: "",
      categories: [],
    });
    setEditingId(null);
    setShowForm(true);
    setImagePreviewUrl("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("demo_url", form.demo_url);
    formData.append("code_url", form.code_url);

    form.categories.forEach(catId => {
      formData.append("categories", catId);
    });

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await axios.patch(
          `${apiKey}/projects/${editingId}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Project updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axios.post(`${apiKey}/projects/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Project created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      fetchProjects();
      setShowForm(false);
      setEditingId(null);
      setImagePreviewUrl("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save project.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewCategory = async () => {
    const name = newCategoryInput.trim();
    if (!name) {
      Swal.fire("Warning", "Category name cannot be empty.", "warning");
      return;
    }

    const exists = allCategories.some(cat =>
      cat.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      Swal.fire("Info", "This category already exists.", "info");
      return;
    }

    try {
      const res = await axios.post(
        `${apiKey}/categories/`,
        { name },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newCat = res.data;
      setAllCategories(prev => [...prev, newCat]);
      setForm(prev => ({
        ...prev,
        categories: [...prev.categories, newCat.id],
      }));
      setNewCategoryInput("");

      Swal.fire({
        icon: "success",
        title: "Category Added!",
        text: `"${name}" has been created and selected.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      let errorMsg = "Failed to add category.";
      if (err.response?.data?.name) {
        errorMsg = err.response.data.name.join(", ");
      }
      Swal.fire("Error", errorMsg, "error");
    }
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "…" : text;
  };

  const getCategoryNameById = (id) => {
    const cat = allCategories.find(c => c.id === id);
    return cat ? cat.name : `Unknown (${id})`;
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
            <th className="border p-2">Categories</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td className="border p-2 max-w-xs">{p.title}</td>
              <td className="border p-2 max-w-lg">
                <div className="truncate" title={p.description}>
                  {truncateDescription(p.description, 80)}
                </div>
              </td>
              <td className="border p-2 max-w-xs">
                {p.categories?.map(cat => cat.name).join(", ") || "–"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-custom-white bg-custom-blue hover:bg-custom-darkish-blue px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-custom-white bg-red-500 hover:bg-red-800 px-3 py-1 rounded"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setImagePreviewUrl("");
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label>Demo URL:</label>
                <input
                  type="text"
                  name="demo_url"
                  value={form.demo_url}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Figma Link: <span className="text-gray-400 text-sm">(optional)</span></label>
                <input
                  type="text"
                  name="code_url"
                  value={form.code_url}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Category Management — CHIPS + ADD */}
              <div>
                <label className="block mb-2">Categories:</label>

                {/* Selected categories as chips */}
                <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                  {form.categories.length > 0 ? (
                    form.categories.map((catId) => (
                      <div
                        key={catId}
                        className="flex items-center bg-custom-darkish-blue text-white text-xs px-2 py-1 rounded"
                      >
                        {getCategoryNameById(catId)}
                        <button
                          type="button"
                          onClick={() => {
                            setForm(prev => ({
                              ...prev,
                              categories: prev.categories.filter(id => id !== catId)
                            }));
                          }}
                          className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                          aria-label={`Remove ${getCategoryNameById(catId)}`}
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">No categories selected</p>
                  )}
                </div>

                {/* Dropdown to add existing categories */}
                <select
                  value=""
                  onChange={(e) => {
                    const catId = parseInt(e.target.value);
                    if (catId && !form.categories.includes(catId)) {
                      setForm(prev => ({
                        ...prev,
                        categories: [...prev.categories, catId]
                      }));
                    }
                    e.target.value = "";
                  }}
                  className="w-full border p-2 rounded mb-2"
                >
                  <option value="">— Add existing category —</option>
                  {allCategories
                    .filter(cat => !form.categories.includes(cat.id))
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>

                {/* Add new category input + button */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    placeholder="New category name"
                    className="flex-1 border p-2 rounded text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddNewCategory();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddNewCategory}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm whitespace-nowrap"
                  >
                    + Add New
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click “+ Add New” to create and auto-select a category.
                </p>
              </div>

              <div>
                <label>Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full"
                  accept="image/*"
                />
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="mt-2 w-60 h-auto rounded border"
                  />
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-custom-darkish-blue text-white px-4 py-2 rounded-xl border-2 border-custom-darkish-blue hover:bg-transparent hover:text-custom-darkish-blue"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setImagePreviewUrl("");
                  }}
                  className="text-gray-500 hover:text-red-500 px-4 py-2 rounded"
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