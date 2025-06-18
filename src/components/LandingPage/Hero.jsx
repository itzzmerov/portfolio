import HeroImg from '../../assets/images/hero-img.png'
import TriangleBlob from '../../assets/images/triangle-blob.png'
import InvertedPyramidBlob from '../../assets/images/inverted-pyramid-blob.png'
import TypingEffect from '../AnimatedComponents/TypingEffect';

const Hero = () => {
    return (
        <section id="home" className="relative overflow-x-hidden grid grid-cols-1 md:grid-cols-2 items-center justify-between py-44 px-24">
            <div className='flex justify-center px-10'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h2 className="text-5xl font-titillium font-bold text-custom-darkish-blue">Hi, I'm...</h2>
                        <h1 className="text-9xl font-titillium font-black text-custom-darkish-blue">John Rovie</h1>
                        <TypingEffect />
                    </div>
                    <p className="text-lg text-custom-black font-montserrat mt-4 max-w-xl">
                        As a passionate web developer and IT instructor from the Philippines, I thrive on creating innovative web solutions and sharing knowledge with the next generation of tech enthusiasts. Dive into my portfolio to explore my projects, skills, and insights. Let's connect and bring your digital ideas to life!
                    </p>
                    <div className="mt-6 flex space-x-4">
                        <button className="bg-custom-darkish-blue text-white font-montserrat font-semibold px-10 py-4 rounded-2xl hover:bg-transparent hover:border-2 hover:border-custom-darkish-blue hover:text-custom-darkish-blue">Download CV</button>
                        <button className="bg-custom-dark-pink text-white font-montserrat font-semibold px-10 py-4 rounded-2xl hover:bg-transparent hover:border-2 hover:border-custom-dark-pink hover:text-custom-dark-pink">Contact Me</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center relative h-[600px] w-full">
                <img
                    src={HeroImg}
                    alt="Floating"
                    className="h-[570px] hover:h-[580px] animate-float relative z-10"
                />
                <div className="absolute -bottom-3 w-[420px] h-5 bg-black/20 rounded-full blur-md mx-auto animate-shadow-float"></div>
            </div>

            {/* Blobs */}
            <img
                src={TriangleBlob}
                alt="Triangle Blob"
                className="absolute bottom-[115px] left-[-360px] w-[650px] opacity-50"
            />
            <img
                src={InvertedPyramidBlob}
                alt="Inverted Pyramid Blob"
                className="absolute -top-8 -right-32 w-[750px]"
            />
        </section>
    );
};

export default Hero;