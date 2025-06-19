import { useState } from 'react';
import { FaFacebook, FaLinkedin, FaFacebookMessenger } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TriangleBlob from '../../assets/images/triangle-blob.png'
import ManyTriangleBlob from '../../assets/images/many-triangle-blob.png'

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <section id="contact" className="relative overflow-x-hidden px-6 md:px-28 py-20">
            <h2 className="relative z-20 text-center text-custom-darkish-blue text-7xl font-titillium font-black underline mb-4">Contact Me</h2>
            <div className="flex gap-10 justify-center mb-16">
                <a href='mailto:balingbing.johnrovie20@gmail.com' className="text-custom-darkish-blue hover:text-custom-dark-pink"><MdEmail fontSize={'50px'} /></a>
                <a href='https://www.messenger.com/t/itzzmerov' target='_blank' rel='noreferrer' className="text-custom-darkish-blue hover:text-custom-dark-pink"><FaFacebookMessenger fontSize={'50px'} /></a>
                <a href='https://www.facebook.com/itzzmerov' target='_blank' rel='noreferrer' className="text-custom-darkish-blue hover:text-custom-dark-pink"><FaFacebook fontSize={'50px'} /></a>
                <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer' className="text-custom-darkish-blue hover:text-custom-dark-pink"><FaLinkedin fontSize={'50px'} /></a>
            </div>
            <form className="max-w-2xl mx-auto flex flex-col gap-6 justify-center items-center px-4 md:px-0">
                {/* Name */}
                <div className="relative w-full">
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder=" "
                        className="peer w-full p-3 border-2 border-custom-pink bg-transparent rounded-xl text-custom-black placeholder-transparent focus:outline-none"
                    />
                    <label
                        htmlFor="name"
                        className={`absolute left-3 px-1 font-montserrat bg-[#EFFAFD] transition-all duration-200 text-custom-pink ${name ? 'top-[-10px] text-sm' : 'top-3.5 text-base'
                            } peer-focus:top-[-10px] peer-focus:text-sm`}
                    >
                        Name
                    </label>
                </div>

                {/* Email */}
                <div className="relative w-full">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        className="peer w-full p-3 border-2 border-custom-pink bg-transparent rounded-xl text-custom-black placeholder-transparent focus:outline-none"
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-3 px-1 font-montserrat bg-[#EFFAFD] transition-all duration-200 text-custom-pink ${email ? 'top-[-10px] text-sm' : 'top-3.5 text-base'
                            } peer-focus:top-[-10px] peer-focus:text-sm`}
                    >
                        Email Address
                    </label>
                </div>

                {/* Message */}
                <div className="relative w-full">
                    <textarea
                        id="message"
                        rows="6"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder=" "
                        className="peer w-full p-3 border-2 border-custom-pink bg-transparent rounded-xl text-custom-black placeholder-transparent focus:outline-none resize-none"
                    ></textarea>
                    <label
                        htmlFor="message"
                        className={`absolute left-3 px-1 font-montserrat bg-[#EFFAFD] transition-all duration-200 text-custom-pink ${message ? 'top-[-10px] text-sm' : 'top-3.5 text-base'
                            } peer-focus:top-[-10px] peer-focus:text-sm`}
                    >
                        Message
                    </label>
                </div>

                <button className="bg-custom-dark-pink hover:bg-transparent border-2 hover:border-custom-pink text-white hover:text-custom-pink text-md font-montserrat font-semibold py-3 w-52 rounded-xl">
                    Submit
                </button>
            </form>

            {/* Blobs */}
            <img
                src={TriangleBlob}
                alt="Triangle Blob"
                className="absolute bottom-0 left-[-180px] w-[500px] opacity-50 z-10"
            />
            <img
                src={ManyTriangleBlob}
                alt="Inverted Pyramid Blob"
                className="absolute top-0 right-[-320px] w-[650px] opacity-50 rotate-180 z-10"
            />
        </section>
    );
};

export default Contact;