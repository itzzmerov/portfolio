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

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Social Links in 2 Columns */}
      <div>
        <label className="block mb-2 font-semibold">Social Links</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="facebook">Facebook:</label>
            <input
              type="text"
              name="facebook"
              id="facebook"
              placeholder="Facebook"
              value={form.facebook}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="instagram">Instagram:</label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              placeholder="Instagram"
              value={form.instagram}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="twitter">Twitter:</label>
            <input
              type="text"
              name="twitter"
              id="twitter"
              placeholder="Twitter"
              value={form.twitter}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkedin">LinkedIn:</label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              placeholder="LinkedIn"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="messenger">Messenger:</label>
            <input
              type="text"
              name="messenger"
              id="messenger"
              placeholder="Messenger"
              value={form.messenger}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="youtube">YouTube:</label>
            <input
              type="text"
              name="youtube"
              id="youtube"
              placeholder="YouTube"
              value={form.youtube}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="github">GitHub:</label>
            <input
              type="text"
              name="github"
              id="github"
              placeholder="GitHub"
              value={form.github}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label htmlFor="image">About Me Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-custom-darkish-blue text-white px-7 py-2 rounded border-2 border-custom-darkish-blue hover:bg-transparent hover:text-custom-darkish-blue hover:font-bold"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AboutForm;
