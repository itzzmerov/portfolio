import { useState } from 'react';
import swal from 'sweetalert';
import { FaFacebook, FaLinkedin, FaFacebookMessenger } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TriangleBlob from '../../assets/images/triangle-blob.png';
import ManyTriangleBlob from '../../assets/images/many-triangle-blob.png';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            message
        };

        try {
            const res = await fetch("https://formspree.io/f/mgvylvbk", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                swal("Thank you!", "Your message has been sent successfully!", "success");
                setName('');
                setEmail('');
                setMessage('');
            } else {
                swal("Oops!", "Something went wrong. Please try again.", "error");
            }
        } catch (err) {
            swal("Error", "Unable to send the message. Please check your internet or try later.", "error");
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80 pt-28 pb-10"
        >
            <h2 className="relative z-20 text-center text-custom-darkish-blue text-5xl tablet:text-6xl laptop:text-7xl font-titillium font-black underline mb-3 laptop:mb-8">
                Contact Me
            </h2>

            <div className="flex flex-wrap gap-6 justify-center mb-16" data-aos="fade-up">
                <a href="mailto:balingbing.johnrovie20@gmail.com" className="text-custom-darkish-blue hover:text-custom-dark-pink">
                    <MdEmail fontSize={'40px'} />
                </a>
                <a href="https://www.messenger.com/t/itzzmerov" target="_blank" rel="noreferrer" className="text-custom-darkish-blue hover:text-custom-dark-pink">
                    <FaFacebookMessenger fontSize={'40px'} />
                </a>
                <a href="https://www.facebook.com/itzzmerov" target="_blank" rel="noreferrer" className="text-custom-darkish-blue hover:text-custom-dark-pink">
                    <FaFacebook fontSize={'40px'} />
                </a>
                <a href="linkedin.com/in/johnroviebalingbing" target="_blank" rel="noreferrer" className="text-custom-darkish-blue hover:text-custom-dark-pink">
                    <FaLinkedin fontSize={'40px'} />
                </a>
            </div>

            <form
                onSubmit={handleSubmit}
                data-aos="fade-up"
                className="w-full max-w-xl mx-auto flex flex-col gap-6 justify-center items-center px-2 tablet:px-0"
            >
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
                <button
                    type="submit"
                    className="bg-custom-dark-pink hover:bg-transparent border-2 hover:border-custom-pink text-white hover:text-custom-pink text-md font-montserrat font-semibold py-3 w-44 rounded-xl transition-all"
                >
                    Submit
                </button>
            </form>

            {/* Blobs */}
            <img
                src={TriangleBlob}
                alt="Triangle Blob"
                className="absolute -bottom-10 tablet:bottom-5 left-[-180px] tablet:left-[-200px] laptop:left-[-250px] w-[300px] tablet:w-[350px] laptop:w-[500px] opacity-50 z-10"
            />
            <img
                src={ManyTriangleBlob}
                alt="Inverted Blob"
                className="hidden tablet:block absolute -top-10 tablet:-top-20 right-[-250px] tablet:right-[-320px] laptop:right-[-400px] laptop-large:right-[-350px] w-[400px] tablet:w-[500px] laptop:w-[650px] opacity-50 rotate-180 z-10"
            />
        </section>
    );
};

export default Contact;
