import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ServicesForm = () => {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        icon: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("authToken");

    const fetchServices = async () => {
        try {
            const res = await axios.get("https://rovidev.pythonanywhere.com/api/services/");
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchServices();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setShowForm(false);
                setEditingId(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                await axios.patch(
                    `http://localhost:8000/api/services/${editingId}/`,
                    form,
                    { headers: { Authorization: `Token ${token}` } }
                );
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Service updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                await axios.post(`http://localhost:8000/api/services/`, form, {
                    headers: { Authorization: `Token ${token}` },
                });
                Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "Service created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
            fetchServices();
            setShowForm(false);
            setEditingId(null);
            setForm({ title: "", description: "", icon: "" });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save service.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setForm({
            title: service.title || "",
            description: service.description || "",
            icon: service.icon || "",
        });
        setEditingId(service.id);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setForm({ title: "", description: "", icon: "" });
        setEditingId(null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This service will be deleted permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`http://localhost:8000/api/services/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            fetchServices();
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Service has been deleted.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete service.",
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-custom-darkish-blue">
                    Services
                </h2>
                <button
                    onClick={handleAddNew}
                    className="bg-custom-darkish-blue text-white px-4 py-2 rounded"
                >
                    + Add New Service
                </button>
            </div>

            <table className="w-full text-left border mt-4">
                <thead>
                    <tr>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Icon</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((s) => (
                        <tr key={s.id}>
                            <td className="border p-2">{s.title}</td>
                            <td className="border p-2">{s.description}</td>
                            <td className="border p-2">{s.icon}</td>
                            <td className="border p-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(s)}
                                    className="text-custom-white bg-custom-blue hover:bg-custom-darkish-blue px-5 py-1 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(s.id)}
                                    className="text-custom-white bg-red-500 hover:bg-red-800 px-5 py-1 rounded-lg"
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
                            {editingId ? "Edit Service" : "Add New Service"}
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
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label>Icon Keyword (e.g., web-design):</label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={form.icon}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>

                            <div className="flex space-x-2 mt-4">
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

export default ServicesForm;
