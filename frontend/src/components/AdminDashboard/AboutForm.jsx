import { useEffect, useState } from "react";
import axios from "axios";

const AboutForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    messenger: "",
    youtube: "",
    github: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/aboutme/");
        const about = res.data[0];
        if (about) {
          setForm({
            ...about,
            image: null,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbout();
  }, []);

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
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await axios.get("http://localhost:8000/api/aboutme/");
      const aboutId = res.data[0]?.id;

      if (aboutId) {
        await axios.patch(`http://localhost:8000/api/aboutme/${aboutId}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("About section updated.");
      } else {
        await axios.post(`http://localhost:8000/api/aboutme/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("About section created.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving about section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-custom-darkish-blue">Edit About Section</h2>
      {["title", "description", "facebook", "instagram", "twitter", "linkedin", "messenger", "youtube", "github"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ))}
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-custom-darkish-blue text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AboutForm;
