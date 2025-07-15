import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  const [initialForm, setInitialForm] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("https://rovidev.pythonanywhere.com/api/aboutme/");
        const about = res.data[0];
        if (about) {
          const initial = {
            title: about.title || "",
            description: about.description || "",
            facebook: about.facebook || "",
            instagram: about.instagram || "",
            twitter: about.twitter || "",
            linkedin: about.linkedin || "",
            messenger: about.messenger || "",
            youtube: about.youtube || "",
            github: about.github || "",
            image: null,
          };
          setForm(initial);
          setInitialForm(initial);
          setImagePreviewUrl(about.image || "");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbout();
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
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "About section updated successfully.",
        }).then(() => {
          window.location.reload();
        });
      } else {
        await axios.post(`http://localhost:8000/api/aboutme/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "About section created successfully.",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error saving about section.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isChanged =
    initialForm &&
    (
      form.title !== initialForm.title ||
      form.description !== initialForm.description ||
      form.facebook !== initialForm.facebook ||
      form.instagram !== initialForm.instagram ||
      form.twitter !== initialForm.twitter ||
      form.linkedin !== initialForm.linkedin ||
      form.messenger !== initialForm.messenger ||
      form.youtube !== initialForm.youtube ||
      form.github !== initialForm.github ||
      form.image !== null
    );

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

      {/* Social Links */}
      <div>
        <label className="block mb-2 font-semibold">Social Links</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "facebook",
            "instagram",
            "twitter",
            "linkedin",
            "messenger",
            "youtube",
            "github",
          ].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                name={field}
                id={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
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

export default AboutForm;
