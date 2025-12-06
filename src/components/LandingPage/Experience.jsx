import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Blobs (reuse from your other components)
import TriangleBlob from "../../assets/images/triangle-blob.png";
import ThreeTriangle from "../../assets/images/three-triangle-blob.png";

const Experience = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const experiences = [
        {
            type: "Education",
            title: "Bachelor of Science in Information Technology",
            company: "Dalubhasaan ng Lungsod ng Lucena",
            period: "Jun 2019 – Aug 2023",
            location: "Lucena City, Philippines",
            description: "Focused on web development, databases, and software engineering principles.",
        },
        {
            type: "Work",
            title: "Web Development Intern",
            company: "Teravision PH",
            period: "Apr 2023 – Jul 2023",
            location: "Remote",
            description: "Built and maintained internal web tools using React and Django. Collaborated with cross-functional teams in an agile environment.",
        },
        {
            type: "Work",
            title: "Web Developer / IT Instructor",
            company: "Dalubhasaan ng Lungsod ng Lucena",
            period: "Sept 2023 – Present",
            location: "On-site",
            description: "Develop institutional websites and teach undergraduate IT courses including Web Development and Programming Fundamentals.",
        },
    ];

    return (
        <section
            id="experience"
            className="relative overflow-hidden px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80 pt-10 laptop-large:pt-16 desktop:pt-28 pb-16 laptop:pb-24"
        >
            {/* Section Title */}
            <h2
                className="relative z-20 text-center text-custom-darkish-blue text-4xl tablet:text-4xl laptop:text-7xl font-titillium font-black underline mb-16"
                data-aos="fade-up"
            >
                Experience
            </h2>

            {/* Timeline */}
            <div className="relative z-20 max-w-4xl mx-auto">
                {/* Vertical Line (subtle) */}
                <div className="absolute left-6 tablet:left-8 top-0 bottom-0 w-0.5 bg-custom-darkish-blue/20 hidden tablet:block"></div>

                <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className="relative pl-16 tablet:pl-20"
                            data-aos="fade-left"
                            data-aos-delay={idx * 150}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-4 tablet:left-6 top-1 w-3 h-3 rounded-full bg-custom-darkish-blue"></div>

                            {/* Card */}
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-50 text-custom-darkish-blue rounded-full">
                                        {exp.type}
                                    </span>
                                    <span className="text-sm text-gray-500 font-montserrat">{exp.period}</span>
                                </div>

                                <h3 className="text-xl font-bold text-custom-darkish-blue font-montserrat mb-1">
                                    {exp.title}
                                </h3>
                                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-500 mb-3">{exp.location}</p>
                                <p className="text-gray-700 text-sm">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Blobs */}
            <img
                src={ThreeTriangle}
                alt="Blob"
                className="absolute bottom-10 left-[-100px] w-[200px] tablet:w-[300px] opacity-30 z-10"
            />
            <img
                src={TriangleBlob}
                alt="Blob"
                className="absolute top-20 right-[-120px] w-[300px] tablet:w-[400px] opacity-30 rotate-180 z-10"
            />
        </section>
    );
};

export default Experience;