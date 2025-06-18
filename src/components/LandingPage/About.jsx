import AboutImg from '../../assets/images/about-img.png'
import InvertedPyramidBlob from '../../assets/images/inverted-pyramid-blob.png'
import ManyTriangleBlob from '../../assets/images/many-triangle-blob.png'
import { MdOutlineWork, MdSchool } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaFacebookMessenger, FaYoutube } from "react-icons/fa";

const About = () => {
    return (
        <section id="about" className="relative overflow-x-hidden grid grid-cols-1 md:grid-cols-2 items-center justify-between py-20 px-24">
            <div className="flex justify-center">
                <img src={AboutImg} alt="Profile" className="h-[750px] mb-5 md:mb-0" />
            </div>
            <div className="flex flex-col gap-5 px-10">
                <h1 className="font-titillium font-black text-custom-darkish-blue text-8xl">About Me</h1>

                <div className="grid grid-cols-2 gap-3 py-2">
                    <div className="text-center px-8 py-4 border-2 border-custom-darkish-blue rounded-xl">
                        <p className="flex justify-center pb-2 text-custom-black"><MdOutlineWork fontSize={'50px'} /></p>
                        <p className="font-league text-3xl">Work Experience</p>
                        <p className="font-montserrat text-lg">IT Instructor</p>
                        <p className="font-montserrat text-lg">Frontend Developer</p>
                    </div>
                    <div className="text-center px-8 py-4 border-2 border-custom-darkish-blue rounded-xl">
                        <p className="flex justify-center pb-2 text-custom-black"><MdSchool fontSize={'50px'} /></p>
                        <p className="font-league text-3xl">Education</p>
                        <p className="font-montserrat text-lg">B.S. Information Technology</p>
                        <p className="font-montserrat text-lg">Batch 2023</p>
                    </div>
                </div>

                <p className="font-montserrat text-custom-black text-xl max-w-3xl leading-8">With a strong foundation in web development and a passion for technology education, I’ve dedicated my career to crafting engaging digital experiences and empowering others through knowledge. I believe that learning never stops, and I'm excited to connect with fellow developers, educators, and innovators.</p>

                <div className="flex gap-5">
                    <p className="text-custom-darkish-blue"><FaFacebook fontSize={'50px'} /></p>
                    <p className="text-custom-darkish-blue"><FaInstagram fontSize={'50px'} /></p>
                    <p className="text-custom-darkish-blue"><FaTwitter fontSize={'50px'} /></p>
                    <p className="text-custom-darkish-blue"><FaLinkedin fontSize={'50px'} /></p>
                    <p className="text-custom-darkish-blue"><FaFacebookMessenger fontSize={'50px'} /></p>
                    <p className="text-custom-darkish-blue"><FaYoutube fontSize={'50px'} /></p>
                </div>

                <div className="mt-6 flex space-x-4">
                    <button className="bg-custom-darkish-blue text-white font-montserrat font-semibold px-10 py-4 rounded-2xl hover:bg-transparent hover:border-2 hover:border-custom-darkish-blue hover:text-custom-darkish-blue">Download CV</button>
                    <button className="bg-custom-dark-pink text-white font-montserrat font-semibold px-10 py-4 rounded-2xl hover:bg-transparent hover:border-2 hover:border-custom-dark-pink hover:text-custom-dark-pink">Contact Me</button>
                </div>
            </div>

            {/* Blobs */}
            <img
                src={InvertedPyramidBlob}
                alt="Triangle Blob"
                className="absolute bottom-0 left-[-100px] w-[650px] opacity-50 rotate-180"
            />
            <img
                src={ManyTriangleBlob}
                alt="Inverted Pyramid Blob"
                className="absolute -top-28 right-[-550px] w-[750px] opacity-50 z-50"
            />
        </section>
    );
};

export default About;