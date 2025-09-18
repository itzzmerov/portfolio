import { useEffect, useState } from 'react';
import InvertedPyramidBlob from '../../assets/images/inverted-pyramid-blob.png';
import ManyTriangleBlob from '../../assets/images/many-triangle-blob.png';
import { MdOutlineWork, MdSchool } from "react-icons/md";
import {
    FaFacebook, FaInstagram, FaTwitter,
    FaLinkedin, FaFacebookMessenger, FaYoutube,
    FaGithub
} from "react-icons/fa";
import axios from 'axios';

const About = () => {

    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        axios.get('https://rovidev.pythonanywhere.com/api/aboutme/1/')
            .then(res => setAboutData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!aboutData) return <div>Loading...</div>;

    return (
        <section id="about" className="relative overflow-hidden grid grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 items-center justify-between pt-24 laptop-large:pt-28 desktop:pt-44 pb-20 px-6 tablet:px-10 laptop-large:px-24 desktop:px-52 desktop-4k:px-80">

            <div className="order-1 laptop:order-1 flex justify-center mb-8 laptop:mb-0 relative z-20">
                <img src={aboutData.image} alt="Profile" className="h-[300px] tablet:h-[500px] laptop-large:h-[650px]" />
            </div>

            <div className="order-2 laptop:order-1 flex flex-col gap-3 tablet:gap-5 items-center tablet:items-center laptop:items-start text-center tablet:text-center laptop:text-left px-2 tablet:px-10 relative z-20">
                <h1 className="font-titillium font-black text-custom-darkish-blue text-5xl tablet:text-7xl laptop-large:text-8xl">{aboutData.title}</h1>

                <div className="grid grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 gap-4 py-2 w-full">
                    <div className="flex flex-col justify-center items-center text-center px-6 laptop:px-2 py-4 laptop-large:py-6 border-2 border-custom-darkish-blue rounded-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <p className="flex justify-center pb-2 text-custom-black"><MdOutlineWork fontSize={'30px'} /></p>
                        <p className="font-league text-xl tablet:text-3xl laptop:text-xl desktop:text-2xl">Work Experience</p>
                        <p className="font-montserrat text-sm tablet:text-lg laptop:text-sm desktop:text-lg">IT Instructor</p>
                        <p className="font-montserrat text-sm tablet:text-lg laptop:text-sm desktop:text-lg">Frontend Developer</p>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center px-6 laptop:px-2 py-4 border-2 border-custom-darkish-blue rounded-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                        <p className="flex justify-center pb-2 text-custom-black"><MdSchool fontSize={'30px'} /></p>
                        <p className="font-league text-xl tablet:text-3xl laptop:text-xl desktop:text-2xl">Education</p>
                        <p className="font-montserrat text-sm tablet:text-lg laptop:text-sm desktop:text-lg">B.S. Information Technology</p>
                        <p className="font-montserrat text-sm tablet:text-lg laptop:text-sm desktop:text-lg">Batch 2023</p>
                    </div>
                </div>

                <p className="font-montserrat text-custom-black text-sm tablet:text-lg laptop:text-base laptop-large:text-xl max-w-3xl leading-7 tablet:leading-8">
                    {aboutData.description}
                </p>

                <div className="flex flex-wrap gap-2 tablet:gap-4 justify-center tablet:justify-center laptop-large:justify-start">

                    <a href={aboutData.facebook} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaFacebook size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Facebook Profile
                        </span>
                    </a>

                    <a href={aboutData.messenger} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaFacebookMessenger size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Messenger
                        </span>
                    </a>

                    <a href={aboutData.linkedin} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaLinkedin size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            LinkedIn Profile
                        </span>
                    </a>

                    <a href={aboutData.github} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaGithub size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            GitHub Profile
                        </span>
                    </a>

                    <a href={aboutData.instagram} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaInstagram size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Instagram Profile
                        </span>
                    </a>

                    <a href={aboutData.twitter} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaTwitter size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Twitter Profile
                        </span>
                    </a>

                    <a href={aboutData.youtube} target="_blank" rel="noreferrer" className="relative group text-custom-darkish-blue hover:text-custom-dark-pink">
                        <FaYoutube size={'35px'} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            YouTube Channel
                        </span>
                    </a>

                </div>

                <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 justify-center laptop:justify-start">
                    <a
                        href="https://drive.google.com/file/d/1KNDwG7BjZBXkk6Yi33EcqNzhPsBZUSnJ/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-custom-darkish-blue text-white font-montserrat font-semibold px-8 py-3 rounded-2xl border-2 border-custom-darkish-blue hover:bg-transparent hover:border-2 hover:border-custom-darkish-blue hover:text-custom-darkish-blue">
                            Download CV
                        </button>
                    </a>
                    <a href='#portfolio'>
                        <button className="bg-custom-dark-pink text-white font-montserrat font-semibold px-8 py-3 rounded-2xl border-2 border-custom-dark-pink hover:bg-transparent hover:text-custom-dark-pink">
                            My Works
                        </button>
                    </a>
                </div>
            </div>

            {/* Background Blobs */}
            <img
                src={InvertedPyramidBlob}
                alt="Inverted Pyramid Blob"
                className="absolute bottom-20 laptop:bottom-0 laptop-large:-bottom-28 left-[-80px] w-[400px] tablet:w-[600px] laptop:w-[500px] laptop-large:w-[650px] opacity-50 rotate-180 z-0"
            />
            <img
                src={ManyTriangleBlob}
                alt="Many Triangle Blob"
                className="absolute top-0 laptop:top-0 laptop-large:-top-20 right-[-250px] tablet:right-[-450px] laptop:right-[-400px] laptop-large:right-[-520px] w-[500px] tablet:w-[650px] laptop:w-[500px] laptop-large:w-[700px] opacity-50 z-0"
            />
        </section>
    );
};

export default About;
