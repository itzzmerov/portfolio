const About = () => {
    return (
        <section id="about" className="py-16 bg-[#EFFAFD]">
            <h2 className="text-center text-4xl font-bold text-[#001D42] mb-8">About Me</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <img src="/profile.png" alt="Profile" className="w-40 h-40 rounded-full mb-5 md:mb-0" />
                <div className="ml-0 md:ml-10">
                    <p className="text-[#1E2122]">I'm an IT Instructor and Front-end Developer with experience in building web solutions.</p>
                </div>
            </div>
        </section>
    );
};

export default About;