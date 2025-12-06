import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import javascriptIcon from "../../assets/skills-img/js.svg";
import htmlIcon from "../../assets/skills-img/html.svg";
import cssIcon from "../../assets/skills-img/css.svg";
import pythonIcon from "../../assets/skills-img/python.svg";
import sqlIcon from "../../assets/skills-img/sql.svg";

import reactIcon from "../../assets/skills-img/react.svg";
import tailwindIcon from "../../assets/skills-img/tailwind.svg";
import djangoIcon from "../../assets/skills-img/django.svg";
import angularIcon from "../../assets/skills-img/angular.svg";
import bootstrapIcon from "../../assets/skills-img/bootstrap.svg";

import githubIcon from "../../assets/skills-img/github.svg";
import vscodeIcon from "../../assets/skills-img/vs code.svg";
import figmaIcon from "../../assets/skills-img/figma.svg";
import firebaseIcon from "../../assets/skills-img/firebase.svg";
import restIcon from "../../assets/skills-img/react.svg";
import netlifyIcon from "../../assets/skills-img/netlify.svg";

import TriangleBlob from "../../assets/images/triangle-blob.png";
import ThreeTriangle from "../../assets/images/three-triangle-blob.png";

const getIcon = (name) => {
    const iconMap = {
        "JavaScript": javascriptIcon,
        "HTML5": htmlIcon,
        "CSS3": cssIcon,
        "Python": pythonIcon,
        "SQL": sqlIcon,

        "React": reactIcon,
        "Tailwind CSS": tailwindIcon,
        "Django": djangoIcon,
        "AngularJS": angularIcon,
        "Bootstrap": bootstrapIcon,

        "Git & GitHub": githubIcon,
        "VS Code": vscodeIcon,
        "Figma": figmaIcon,
        "Firebase": firebaseIcon,
        "REST APIs": restIcon,
        "Netlify": netlifyIcon,
    };
    return iconMap[name] || "";
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
                { name: "HTML5", level: 95 },
                { name: "CSS3", level: 90 },
                { name: "Python", level: 80 },
                { name: "SQL", level: 70 },
            ],
        },
        {
            category: "Frameworks & Libraries",
            items: [
                { name: "React", level: 90 },
                { name: "Tailwind CSS", level: 95 },
                { name: "Django", level: 85 },
                { name: "AngularJS", level: 75 },
                { name: "Bootstrap", level: 85 },
            ],
        },
        {
            category: "Tools & Platforms",
            items: [
                { name: "Git & GitHub", level: 95 },
                { name: "VS Code", level: 90 },
                { name: "Figma", level: 85 },
                { name: "Netlify", level: 90 },
                { name: "Firebase", level: 75 },
                { name: "REST APIs", level: 70 },
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
                                        {icon && (
                                            <div className="flex-shrink-0 w-16 h-16 mr-4">
                                                <img
                                                    src={icon}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}

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