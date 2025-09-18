import { useState } from 'react';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';
import { Link } from 'react-scroll';
import Logo from '../../assets/images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-[#EFFAFD] px-5 py-4 fixed w-full z-50 shadow-md">
            <div className="flex justify-between items-center px-6 laptop:px-20">
                <div className="flex items-center gap-3">
                    <img src={Logo} alt="Logo" className="h-16 mobile:h-14" />
                    <h1 className="font-titillium font-bold text-3xl laptop:text-4xl text-custom-black">RoviDev</h1>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden tablet:flex space-x-6 laptop:space-x-10 items-center font-league font-medium text-base laptop:text-xl text-custom-darkish-blue">
                    <Link to="home" smooth={true} duration={500} className="cursor-pointer hover:text-custom-pink">Home</Link>
                    <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-custom-pink">About</Link>
                    <Link to="portfolio" smooth={true} duration={500} className="cursor-pointer hover:text-custom-pink">Portfolio</Link>
                    <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-custom-pink">Contact</Link>

                    <a
                        href="https://www.github.com/itzzmerov"
                        target="_blank"
                        rel="noreferrer"
                        className="relative group"
                    >
                        <FaGithub className="hover:text-custom-pink cursor-pointer" size={28} />
                        <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            GitHub profile
                        </span>
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <div className="tablet:hidden z-50">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-[100%] left-0 w-full bg-[#EFFAFD] py-6 flex flex-col items-center space-y-4 text-custom-darkish-blue font-league font-semibold text-lg shadow-md tablet:hidden">
                    <Link to="home" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer hover:text-custom-pink">Home</Link>
                    <Link to="about" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer hover:text-custom-pink">About</Link>
                    <Link to="portfolio" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer hover:text-custom-pink">Portfolio</Link>
                    <Link to="contact" smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer hover:text-custom-pink">Contact</Link>
                    <a href="https://www.github.com/itzzmerov" target="_blank" rel="noreferrer">
                        <FaGithub className="hover:text-custom-pink cursor-pointer" size={24} />
                    </a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
