import HeroImg from '../../assets/images/hero-img.png'

const Hero = () => {
    return (
        <section id="home" className="grid grid-cols-1 md:grid-cols-2 items-center justify-between py-44 px-24">
            <div className='flex justify-center'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h2 className="text-5xl font-titillium font-bold text-custom-darkish-blue">Hi, I'm...</h2>
                        <h1 className="text-9xl font-titillium font-black text-custom-darkish-blue">John Rovie</h1>
                        <h1 className="text-6xl font-titillium font-bold text-custom-black">a Web Developer</h1>
                    </div>
                    <p className="text-lg text-custom-black font-montserrat mt-4 max-w-xl">
                        As a passionate web developer and IT instructor from the Philippines, I thrive on creating innovative web solutions and sharing knowledge with the next generation of tech enthusiasts. Dive into my portfolio to explore my projects, skills, and insights. Let's connect and bring your digital ideas to life!
                    </p>
                    <div className="mt-6 flex space-x-4">
                        <button className="bg-[#001D42] text-white px-6 py-3 rounded">Download CV</button>
                        <button className="bg-[#70004C] text-white px-6 py-3 rounded">Contact Me</button>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <img src={HeroImg} alt="Logo" className="h-[570px]" />
            </div>

        </section>
    );
};

export default Hero;