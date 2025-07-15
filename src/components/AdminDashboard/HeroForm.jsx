import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const HeroForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    positions: "",
    image: null,
  });
  const [initialForm, setInitialForm] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("https://rovidev.pythonanywhere.com/api/herosection/");
        const hero = res.data[0];
        if (hero) {
          const initial = {
            name: hero.name || "",
            description: hero.description || "",
            positions: hero.typing_texts?.map((t) => t.text).join(", ") || "",
            image: null,
          };
          setForm(initial);
          setInitialForm(initial);
          setImagePreviewUrl(hero.image || "");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHero();
  }, []);

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
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Hero section updated successfully.",
        }).then(() => {
          window.location.reload();
        });
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
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Hero section created successfully.",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error saving hero section.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Compare form state to initial state
  const isChanged =
    initialForm &&
    (
      form.name !== initialForm.name ||
      form.description !== initialForm.description ||
      form.positions !== initialForm.positions ||
      form.image !== null
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-custom-darkish-blue">
        Edit Hero Content
      </h2>
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
        <label>
          Positions:{" "}
          <span className="italic opacity-50">(separate with comma)</span>
        </label>
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
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="mt-2 w-60 h-auto rounded border"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !isChanged}
        className={`px-7 py-2 rounded border-2 ${loading || !isChanged
            ? "bg-gray-400 text-white border-gray-400 cursor-not-allowed"
            : "bg-custom-darkish-blue text-white border-custom-darkish-blue hover:bg-transparent hover:text-custom-darkish-blue hover:font-bold"
          }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default HeroForm;
