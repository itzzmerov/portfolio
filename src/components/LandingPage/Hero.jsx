import { useEffect, useState } from 'react';
import TriangleBlob from '../../assets/images/triangle-blob.png';
import InvertedPyramidBlob from '../../assets/images/inverted-pyramid-blob.png';
import TypingEffect from '../AnimatedComponents/TypingEffect';
import axios from 'axios';
import { useLoader } from '../../context/LoaderContext';

const Hero = () => {

    const [heroData, setHeroData] = useState(null);
    const { setLoading } = useLoader();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://rovidev.pythonanywhere.com/api/herosection/1/');
                setHeroData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setLoading]);

    if (!heroData) return null;

    return (
        <section id="home" className="relative overflow-hidden grid grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 items-center justify-between pt-32 tablet:pt-44 pb-20 px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80">
            <div className="order-2 laptop:order-1 flex justify-center text-center laptop:text-left">
                <div className="flex flex-col gap-3 tablet:gap-5 max-w-3xl items-center laptop-large:items-start">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl tablet:text-4xl laptop-large:text-5xl font-titillium font-bold text-custom-darkish-blue">Hi, I'm...</h2>
                        <h1 className="text-5xl tablet:text-7xl laptop-large:text-9xl font-titillium font-black text-custom-darkish-blue">{heroData.name}</h1>
                        <TypingEffect texts={heroData.typing_texts.map(item => item.text)} />
                    </div>
                    <p className="text-sm tablet:text-md laptop:text-base laptop-large:text-lg px-2 tablet:px-10 laptop-large:px-0 text-custom-black font-montserrat mt-4">
                        {heroData.description}
                    </p>
                    <div className="mt-6 tablet:mt-3 flex flex-col tablet:flex-row gap-2 tablet:gap-4 justify-center laptop-large:justify-start">
                        <a
                            href="https://drive.google.com/file/d/1KNDwG7BjZBXkk6Yi33EcqNzhPsBZUSnJ/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="bg-custom-darkish-blue text-white font-montserrat font-semibold px-8 py-3 rounded-2xl border-2 border-custom-darkish-blue hover:bg-transparent hover:border-2 hover:border-custom-darkish-blue hover:text-custom-darkish-blue">
                                Download CV
                            </button>
                        </a>
                        <a href='#contact'>
                            <button className="bg-custom-dark-pink text-white font-montserrat font-semibold px-8 py-3 rounded-2xl border-2 border-custom-dark-pink hover:bg-transparent hover:border-2 hover:border-custom-dark-pink hover:text-custom-dark-pink">
                                Contact Me
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="order-1 laptop-large:order-2 flex justify-center relative h-[350px] tablet:h-[500px] laptop-large:h-[600px] w-full mt-0 mb-6 laptop-large:mb-0">
                <img
                    src={heroData.image}
                    alt="Floating"
                    className="h-[300px] tablet:h-[480px] laptop-large:h-[570px] hover:h-[580px] animate-float relative z-10"
                />
                <div className="absolute bottom-5 tablet:bottom-0 w-[200px] tablet:w-[340px] laptop-large:w-[420px] h-5 bg-black/20 rounded-full blur-md mx-auto animate-shadow-float"></div>
            </div>

            {/* Background Blobs */}
            <img
                src={TriangleBlob}
                alt="Triangle Blob"
                className="absolute -bottom-6 tablet:bottom-0 left-[-200px] tablet:left-[-300px] laptop:left-[-320px] laptop-large:left-[-470px] desktop:left-[-410px] desktop-4k:left-[-300px] w-[500px] laptop-large:w-[650px] opacity-30 z-0"
            />
            <img
                src={InvertedPyramidBlob}
                alt="Inverted Pyramid Blob"
                className="absolute top-20 laptop:top-0 laptop-large:-top-14 -right-16 tablet:-right-24 laptop-large:-right-32 w-[550px] laptop-large:w-[750px] opacity-50 z-0"
            />
        </section>
    );
};

export default Hero;
