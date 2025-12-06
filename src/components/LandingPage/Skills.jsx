import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import icons — add more as needed
import javascriptIcon from "../../assets/icons/javascript.svg";
import firebaseIcon from "../../assets/icons/firebase.svg";
import pythonIcon from "../../assets/icons/python.svg";
import html5Icon from "../../assets/icons/html5.svg";
import css3Icon from "../../assets/icons/css3.svg";
import sqlIcon from "../../assets/icons/sql.svg";

import reactIcon from "../../assets/icons/react.svg";
import nextjsIcon from "../../assets/icons/nextjs.svg";
import tailwindIcon from "../../assets/icons/tailwind.svg";
import djangoIcon from "../../assets/icons/django.svg";
import nodejsIcon from "../../assets/icons/nodejs.svg";
import expressIcon from "../../assets/icons/express.svg";

import githubIcon from "../../assets/icons/github.svg";
import vscodeIcon from "../../assets/icons/vscode.svg";
import figmaIcon from "../../assets/icons/figma.svg";
import postgresqlIcon from "../../assets/icons/postgresql.svg";
import restIcon from "../../assets/icons/rest.svg";
import netlifyIcon from "../../assets/icons/netlify.svg";

import TriangleBlob from "../../assets/images/triangle-blob.png";
import ThreeTriangle from "../../assets/images/three-triangle-blob.png";

// Helper: map skill name to icon
const getIcon = (name) => {
    const iconMap = {
        "JavaScript": javascriptIcon,
        "Python": pythonIcon,
        "HTML5": html5Icon,
        "CSS3": css3Icon,
        "Firebase": firebaseIcon,
        "SQL": sqlIcon,
        "React": reactIcon,
        "Next.js": nextjsIcon,
        "Tailwind CSS": tailwindIcon,
        "Django": djangoIcon,
        "Node.js": nodejsIcon,
        "Express": expressIcon,
        "Git & GitHub": githubIcon,
        "VS Code": vscodeIcon,
        "Figma": figmaIcon,
        "PostgreSQL": postgresqlIcon,
        "REST APIs": restIcon,
        "Netlify / Vercel": netlifyIcon,
    };
    return iconMap[name] || ""; // fallback to empty if not found
};

const Skills = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const skills = [
        {
            category: "Languages",
            items: [
                { name: "JavaScript", level: 90 },
                { name: "Python", level: 80 },
                { name: "HTML5", level: 95 },
                { name: "CSS3", level: 90 },
                { name: "Firebase", level: 75 },
                { name: "SQL", level: 60 },
            ],
        },
        {
            category: "Frameworks & Libraries",
            items: [
                { name: "React", level: 90 },
                { name: "Next.js", level: 80 },
                { name: "Tailwind CSS", level: 95 },
                { name: "Django", level: 85 },
                { name: "Node.js", level: 80 },
                { name: "Express", level: 75 },
            ],
        },
        {
            category: "Tools & Platforms",
            items: [
                { name: "Git & GitHub", level: 90 },
                { name: "VS Code", level: 95 },
                { name: "Figma", level: 80 },
                { name: "PostgreSQL", level: 75 },
                { name: "REST APIs", level: 85 },
                { name: "Netlify / Vercel", level: 90 },
            ],
        },
    ];

    const [hoveredSkill, setHoveredSkill] = useState(null);

    return (
        <section
            id="skills"
            className="relative overflow-hidden px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80 pt-10 laptop-large:pt-16 desktop:pt-28 pb-16 laptop:pb-24"
        >
            <h2
                className="relative z-20 text-center text-custom-darkish-blue text-4xl tablet:text-4xl laptop:text-7xl font-titillium font-black underline mb-16"
                data-aos="fade-up"
            >
                My Skills
            </h2>

            <div className="relative z-20 space-y-12">
                {skills.map((group, idx) => (
                    <div key={group.category} data-aos="fade-up" data-aos-delay={idx * 100}>
                        <h3 className="text-custom-darkish-blue text-xl tablet:text-2xl font-bold mb-6 font-montserrat">
                            {group.category}
                        </h3>
                        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
                            {group.items.map((skill) => {
                                const icon = getIcon(skill.name);
                                return (
                                    <div
                                        key={skill.name}
                                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-start"
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        {/* Icon */}
                                        {icon && (
                                            <div className="flex-shrink-0 w-12 h-12 mr-4">
                                                <img
                                                    src={icon}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}

                                        {/* Skill Info */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold text-custom-darkish-blue font-montserrat">
                                                    {skill.name}
                                                </span>
                                                {hoveredSkill === skill.name && (
                                                    <span className="text-xs bg-custom-darkish-blue text-white px-2 py-1 rounded-full whitespace-nowrap">
                                                        {skill.level}% proficient
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-custom-darkish-blue h-2.5 rounded-full transition-all duration-1000 ease-out"
                                                    style={{
                                                        width: `${hoveredSkill === skill.name ? skill.level : Math.min(20, skill.level)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Blobs */}
            <img
                src={ThreeTriangle}
                alt="Blob"
                className="absolute bottom-10 tablet:bottom-0 left-[-80px] w-[180px] tablet:w-[250px] opacity-40 z-10"
            />
            <img
                src={TriangleBlob}
                alt="Blob"
                className="absolute top-20 right-[-100px] w-[250px] tablet:w-[350px] opacity-40 rotate-180 z-10"
            />
        </section>
    );
};

export default Skills;