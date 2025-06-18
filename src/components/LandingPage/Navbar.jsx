import { useState } from 'react';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';
import Logo from '../../assets/images/logo.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-[#EFFAFD] px-5 py-4 fixed w-full z-50 shadow-md">
            <div className="flex justify-between items-center px-20">
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-20"/>
                    <h1 className="font-titillium font-bold text-4xl text-custom-black">RoviDev</h1>
                </div>
                <nav className="hidden md:flex space-x-10 items-center justify-center font-league font-medium text-xl text-custom-darkish-blue ">
                    <a href="#home" className="hover:text-custom-pink">Home</a>
                    <a href="#about" className="hover:text-custom-pink">About</a>
                    <a href="#portfolio" className="hover:text-custom-pink">Portfolio</a>
                    <a href="#contact" className="hover:text-custom-pink">Contact</a>
                    <FaGithub className="hover:text-custom-pink cursor-pointer" size={'30px'} />
                </nav>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col items-center mt-5 space-y-4">
                    <a href="#home" onClick={toggleMenu}>Home</a>
                    <a href="#about" onClick={toggleMenu}>About</a>
                    <a href="#portfolio" onClick={toggleMenu}>Portfolio</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                </div>
            )}
        </header>
    );
};

export default Navbar;