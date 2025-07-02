import { useEffect, useState } from "react";
import axios from "axios";

const HeroForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    positions: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/herosection/");
        const hero = res.data[0];
        if (hero) {
          setForm({
            name: hero.name || "",
            description: hero.description || "",
            positions: hero.typing_texts?.map((t) => t.text).join(", ") || "",
            image: null,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHero();
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
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("positions", form.positions);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await axios.get("http://localhost:8000/api/herosection/");
      const heroId = res.data[0]?.id;

      if (heroId) {
        await axios.patch(
          `http://localhost:8000/api/herosection/${heroId}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Hero section updated successfully.");
      } else {
        await axios.post(
          "http://localhost:8000/api/herosection/",
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Hero section created successfully.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving hero section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-custom-darkish-blue">Edit Hero Content</h2>
      <div className="flex flex-col gap-2">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Positions: <span className="italic opacity-50">(separate with comma)</span></label>
        <input
          type="text"
          name="positions"
          placeholder="Positions (comma separated)"
          value={form.positions}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Hero Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-custom-darkish-blue text-white px-8 py-3 w-[50%] rounded border-2 border-custom-darkish-blue hover:bg-transparent hover:text-custom-darkish-blue hover:font-bold"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

    </form>
  );
};

export default HeroForm;
