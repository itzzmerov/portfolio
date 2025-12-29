import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

// BLOBS
import TriangleBlob from "../../assets/images/triangle-blob.png";
import ThreeTriangle from "../../assets/images/three-triangle-blob.png";

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchProjects = axios.get(`${apiKey}/projects/`);
    const fetchCategories = axios.get(`${apiKey}/categories/`);

    Promise.all([fetchProjects, fetchCategories])
      .then(([projectsRes, categoriesRes]) => {
        const normalizedProjects = projectsRes.data.map((p) => ({
          ...p,
          categoryList: Array.isArray(p.categories)
            ? p.categories
            : p.categories
              ? [p.categories]
              : [],
        }));

        setProjects(normalizedProjects);

        const categoryNames = categoriesRes.data.map((cat) =>
          typeof cat === "string" ? cat : cat.name || cat.title || cat.id
        );
        setCategories(["All", ...categoryNames]);

        setTimeout(() => AOS.refresh(), 50);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [apiKey]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) =>
        p.categoryList.some((cat) =>
          typeof cat === "string"
            ? cat === activeCategory
            : cat.name === activeCategory || cat.id === activeCategory
        )
      );

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const projectCount = visibleProjects.length;

  const handleSeeMore = () => {
    setVisibleCount(filteredProjects.length);
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80 pt-10 laptop-large:pt-16 desktop:pt-28 pb-0 laptop:pb-10"
    >
      <h2
        className="relative z-20 text-center text-custom-darkish-blue text-4xl tablet:text-4xl laptop:text-7xl font-titillium font-black underline mb-12"
        data-aos="fade-up"
      >
        Portfolio
      </h2>

      <div
        className="relative z-20 flex flex-wrap justify-center gap-3 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(6);
            }}
            className={`px-5 py-2 rounded-full text-sm tablet:text-base font-semibold border transition
              ${activeCategory === cat
                ? "bg-custom-dark-pink text-white border-custom-dark-pink border-2"
                : "text-custom-dark-pink border-custom-dark-pink border-2 hover:bg-custom-dark-pink hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className={`relative z-20 flex flex-wrap gap-6 ${projectCount === 1
          ? "justify-center"
          : projectCount === 2
            ? "justify-center tablet:justify-center laptop:justify-center"
            : projectCount >= 4
              ? "justify-center tablet:justify-center laptop:justify-start"
              : "justify-center"
          }`}
      >
        {visibleProjects.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            className="w-full tablet:w-[45%] laptop-large:w-[30%] transition"
          >
            <a
              href={item.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <div className="relative group w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl tablet:text-3xl laptop:text-4xl font-bold font-titillium text-center px-4">
                    Click to Visit
                  </h3>
                </div>
              </div>
            </a>

            <div className="flex w-full flex-col">
              <p className="w-full flex items-center font-montserrat font-semibold py-3 text-sm tablet:text-base laptop:text-xl">
                {item.title}
              </p>
              <p className="w-full text-custom-black pb-3 text-sm tablet:text-base laptop:text-lg line-clamp-3">
                {item.description}
              </p>

              <button
                onClick={() => setSelectedProject(item)}
                className="flex items-center text-left w-auto text-custom-darkish-blue font-semibold hover:underline hover:text-custom-pink pt-2"
              >
                Read More <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeMore}
            className="bg-custom-darkish-blue text-white text-lg px-10 py-4 rounded-xl font-semibold border-2 border-custom-darkish-blue hover:bg-transparent hover:text-custom-darkish-blue transition"
          >
            See More
          </button>
        </div>
      )}

      {/* BLOBS */}
      <img
        src={ThreeTriangle}
        alt="Three Triangle Blob"
        className="absolute bottom-28 tablet:bottom-24 laptop:bottom-32 left-[-100px] tablet:left-[-150px] w-[200px] tablet:w-[300px] laptop:w-[400px] opacity-50 z-10"
      />
      <img
        src={TriangleBlob}
        alt="Triangle Blob"
        className="absolute top-20 tablet:top-14 laptop:top-36 right-[-150px] tablet:right-[-200px] laptop:right-[-250px] w-[300px] tablet:w-[400px] laptop:w-[500px] opacity-50 rotate-180 z-10"
      />

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-[90%] p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold mb-4 text-custom-darkish-blue text-center">
              {selectedProject.title}
            </h3>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-56 object-cover rounded-md mb-4"
            />

            <p className="text-gray-700 text-justify mb-4">
              {selectedProject.description}
            </p>

            <div className="flex justify-center">
              <a
                href={selectedProject.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-custom-darkish-blue text-white px-6 py-2 rounded-xl font-semibold hover:bg-transparent hover:text-custom-darkish-blue border-2 border-custom-darkish-blue transition"
              >
                Visit Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;