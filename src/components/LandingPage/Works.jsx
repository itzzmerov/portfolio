import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
// BLOBS
import TriangleBlob from "../../assets/images/triangle-blob.png";
import ThreeTriangle from "../../assets/images/three-triangle-blob.png";

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    axios
      .get("https://rovidev.pythonanywhere.com/api/projects/")
      .then((res) => {
        setProjects(res.data);
        setTimeout(() => AOS.refresh(), 50);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleSeeMore = () => {
    setVisibleCount(projects.length);
  };

  // Determine how many projects are visible
  const visibleProjects = projects.slice(0, visibleCount);
  const projectCount = visibleProjects.length;

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80 pt-28 laptop:pt-20 pb-0 laptop:pb-10"
    >
      <h2
        className="relative z-20 text-center text-custom-darkish-blue text-5xl tablet:text-6xl laptop:text-8xl font-titillium font-black underline mb-16"
        data-aos="fade-up"
      >
        Portfolio
      </h2>

      {/* 🔧 Dynamic Layout for Centering Cards */}
      <div
        className={`relative z-20 flex flex-wrap gap-6 ${projectCount === 1
          ? "justify-center"
          : projectCount === 2
            ? "justify-center tablet:justify-center laptop:justify-center"
            : "justify-start tablet:justify-between laptop:justify-between"
          }`}
      >
        {visibleProjects.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            className="w-full tablet:w-[45%] laptop-large:w-[30%] border-2 border-custom-black rounded-xl shadow-md hover:text-custom-pink transition"
          >
            <a
              href={item.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <div className="relative group w-full h-[150px] tablet:h-[200px] laptop:h-[250px] desktop:h-[270px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl tablet:text-3xl laptop:text-4xl font-bold font-titillium text-center px-4">
                    Click to Visit
                  </h3>
                </div>
              </div>
            </a>

            <div className="flex w-full flex-col">
              <p className="w-full flex justify-center items-center font-montserrat font-semibold p-3 text-sm tablet:text-base laptop:text-xl">
                {item.title}
              </p>
              <p
                className="w-full text-center text-custom-black px-3 pb-3 text-sm tablet:text-base laptop:text-lg line-clamp-3"
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show "See More" if there are more items */}
      {visibleCount < projects.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeMore}
            className="bg-custom-darkish-blue text-white text-lg px-10 py-4 rounded-xl font-semibold border-2 border-custom-darkish-blue hover:bg-transparent hover:text-custom-darkish-blue transition"
          >
            See More
          </button>
        </div>
      )}

      {/* Blobs */}
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
    </section>
  );
};

export default Works;
