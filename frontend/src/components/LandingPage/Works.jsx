import MusicPlayerApp from '../../assets/images/works/music-player-app.png';
import DllWebsite from '../../assets/images/works/dll-website.png'
import OnlineExam from '../../assets/images/works/online-exam-system.png'
import AppointmentBooking from '../../assets/images/works/appointment-booking.png'
import CoffeeShop from '../../assets/images/works/coffee-shop.png'
import ITParadigm from '../../assets/images/works/it-paradigm.png'

// BLOBS
import TriangleBlob from '../../assets/images/triangle-blob.png';
import ThreeTriangle from '../../assets/images/three-triangle-blob.png';

const portfolioItems = [
    {
        title: "DLL SIS Website",
        demoUrl: "https://dll.edu.ph",
        codeUrl: "https://github.com/itzzmerov",
        projImage: DllWebsite,
        imgAlt: "DLL SIS Website"
    },
    {
        title: "Coffee Shop Website",
        demoUrl: "https://kapetanncoffeeshop.infinityfreeapp.com/",
        codeUrl: "https://github.com/itzzmerov/coffee-shop-website",
        projImage: CoffeeShop,
        imgAlt: "Coffee Shop Website"
    },
    {
        title: "Music Player App",
        demoUrl: "https://itzzmerov.github.io/music-player-app/",
        codeUrl: "https://github.com/itzzmerov/music-player-app",
        projImage: MusicPlayerApp,
        imgAlt: "Music Player App"
    },
    {
        title: "Online Exam System",
        demoUrl: "https://github.com/itzzmerov/online-examination-system",
        codeUrl: "https://github.com/itzzmerov/online-examination-system",
        projImage: OnlineExam,
        imgAlt: "Online Exam System"
    },
    {
        title: "Appointment Booking App",
        demoUrl: "https://itzzmerov.github.io/appointment-booking-app/",
        codeUrl: "https://github.com/itzzmerov/appointment-booking-app",
        projImage: AppointmentBooking,
        imgAlt: "Appointment Booking App"
    },
    {
        title: "IT Paradigm Website",
        demoUrl: "https://itzzmerov.github.io/itparadigm-landing-page/",
        codeUrl: "https://github.com/itzzmerov/itparadigm-landing-page",
        projImage: ITParadigm,
        imgAlt: "IT Paradigm Website"
    }
];

const Works = () => {
    return (
        <section id="portfolio" className="relative overflow-hidden px-6 tablet:px-10 laptop:px-24 desktop:px-52 desktop-4k:px-80 pt-28 laptop:pt-20 pb-0 laptop:pb-10">
            <h2 className="relative z-20 text-center text-custom-darkish-blue text-5xl tablet:text-6xl laptop:text-8xl font-titillium font-black underline mb-16">
                Portfolio
            </h2>

            <div className="relative z-20 grid grid-cols-1 tablet:grid-cols-2 laptop-large:grid-cols-3 gap-6">
                {portfolioItems.map((item, index) => (
                    <div key={index} className="border-2 border-custom-black rounded-xl shadow-md">
                        <div className="relative group w-full h-[150px] tablet:h-[200px] laptop:h-[250px] desktop:h-[270px]">
                            <img
                                src={item.projImage}
                                alt={item.imgAlt}
                                className="w-full h-full object-cover rounded-t-xl"
                            />
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <h3 className="text-white text-2xl tablet:text-3xl laptop:text-4xl font-bold font-titillium text-center px-4">
                                    {item.title}
                                </h3>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <button className="w-full text-custom-black hover:text-custom-pink font-montserrat font-semibold border-t-2 border-r-2 border-custom-black p-3 text-sm tablet:text-base">
                                    View Demo
                                </button>
                            </a>
                            <a href={item.codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <button className="w-full text-custom-black hover:text-custom-pink font-montserrat font-semibold border-t-2 border-custom-black p-3 text-sm tablet:text-base">
                                    Source Code
                                </button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Blobs */}
            <img
                src={ThreeTriangle}
                alt="Three Triangle Blob"
                className="absolute bottom-28 tablet:bottom-24 laptop:bottom-32 left-[-100px] tablet:left-[-150px] w-[200px] tablet:w-[300px] laptop:w-[400px] opacity-50 z-10"
            />
            <img
                src={TriangleBlob}
                alt="Triangle Blob"
                className="absolute top-20 tablet:top-14 laptop:top-36 right-[-150px] tablet:right-[-200px] laptop:right-[-250px] w-[300px] tablet:w-[400px] laptop:w-[500px] opacity-50 rotate-180 z-10"
            />
        </section>
    );
};

export default Works;
