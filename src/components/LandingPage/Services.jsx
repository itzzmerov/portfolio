import { useEffect, useState } from "react";
import axios from "axios";
import { CgWebsite } from "react-icons/cg";
import { FaLaptopCode } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import ManyTriangleBlob from "../../assets/images/many-triangle-blob.png";
import AOS from "aos";

// Map icon keywords to actual components
const iconMap = {
  "web-design": <CgWebsite />,
  "web-development": <FaLaptopCode />,
  "ui-ux-design": <MdDesignServices />,
};

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://rovidev.pythonanywhere.com/api/services/"
        );
        setServices(res.data);
        setTimeout(() => AOS.refresh(), 50);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="py-12 bg-custom-white relative overflow-hidden pt-24 laptop-large:pt-28 desktop:pt-44 pb-20 px-6 tablet:px-10 laptop-large:px-24 desktop:px-52 desktop-4k:px-80">
      <div className="container mx-auto px-4">
        <h2
          className="relative z-20 text-center text-custom-darkish-blue text-4xl tablet:text-4xl laptop:text-7xl font-titillium font-black mb-16"
          data-aos="fade-up"
        >
          Services
        </h2>
        <div className="grid gap-6 grid-cols-1 laptop:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-transparent rounded-lg shadow p-8 laptop:p-10 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-3 border-2 border-custom-darkish-blue gap-2 text-custom-darkish-blue hover:text-custom-dark-pink "
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <p className="text-6xl laptop:text-7xl">
                {iconMap[service.icon] || <CgWebsite />} {/* Fallback icon */}
              </p>
              <h3 className="text-2xl laptop:text-3xl font-bold font-montserrat mb-2">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600 text-center font-titillium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <img
        src={ManyTriangleBlob}
        alt="Inverted Blob"
        className="hidden tablet:block absolute -top-10 tablet:-top-20 right-[-250px] tablet:right-[-320px] laptop:right-[-480px] laptop-large:right-[-380px] w-[400px] tablet:w-[500px] laptop:w-[650px] opacity-50 rotate-180 z-10"
      />
    </section>
  );
};

export default Services;
