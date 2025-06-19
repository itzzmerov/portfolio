import PortfolioWebsite from '../../assets/images/works/portfolio.png'
import MusicPlayerApp from '../../assets/images/works/music-player-app.png'
import TriangleBlob from '../../assets/images/triangle-blob.png'
import ThreeTriangle from '../../assets/images/three-triangle-blob.png'

const portfolioItems = [
    {
        title: "Portfolio Website",
        demoUrl: "https://demo1.example.com",
        codeUrl: "https://github.com/yourusername/project-one",
        projImage: PortfolioWebsite,
        imgAlt: "Portfolio Website"
    },
    {
        title: "Music Player App",
        demoUrl: "https://demo2.example.com",
        codeUrl: "https://github.com/yourusername/project-two",
        projImage: MusicPlayerApp,
        imgAlt: "Music Player App"
    },
    {
        title: "Project Three",
        demoUrl: "https://demo3.example.com",
        codeUrl: "https://github.com/yourusername/project-three",
        projImage: PortfolioWebsite,
        imgAlt: "Portfolio Website"
    },
    {
        title: "Project Four",
        demoUrl: "https://demo4.example.com",
        codeUrl: "https://github.com/yourusername/project-four",
        projImage: PortfolioWebsite,
        imgAlt: "Portfolio Website"
    },
    {
        title: "Project Five",
        demoUrl: "https://demo5.example.com",
        codeUrl: "https://github.com/yourusername/project-five",
        projImage: PortfolioWebsite,
        imgAlt: "Portfolio Website"
    },
    {
        title: "Project Six",
        demoUrl: "https://demo6.example.com",
        codeUrl: "https://github.com/yourusername/project-six",
        projImage: PortfolioWebsite,
        imgAlt: "Portfolio Website"
    }
];

const Works = () => {
    return (
        <section id="portfolio" className="relative overflow-x-hidden px-6 md:px-28 py-20">
            <h2 className="relative z-20 text-center text-custom-darkish-blue text-8xl font-titillium font-black underline mb-16">Portfolio</h2>
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-5">
                {portfolioItems.map((item, index) => (
                    <div key={index} className="border-2 border-custom-black rounded-xl">
                        <div className="relative group w-full h-[300px]">
                            <img
                                src={item.projImage}
                                alt={item.imgAlt}
                                className="w-full h-full object-cover rounded-t-xl"
                            />
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <h3 className="text-white text-4xl font-bold font-titillium text-center px-4">{item.title}</h3>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <button className="w-full text-custom-black hover:text-custom-pink font-montserrat font-semibold border-t-2 border-r-2 border-custom-black p-3">View Demo</button>
                            </a>
                            <a href={item.codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <button className="w-full text-custom-black hover:text-custom-pink font-montserrat font-semibold border-t-2 border-custom-black p-3">Source Code</button>
                            </a>
                        </div>

                    </div>
                ))}
            </div>

            {/* Blobs */}
            <img
                src={ThreeTriangle}
                alt="Triangle Blob"
                className="absolute bottom-32 left-[-180px] w-[500px] opacity-50 z-10"
            />
            <img
                src={TriangleBlob}
                alt="Inverted Pyramid Blob"
                className="absolute top-0 right-[-320px] w-[650px] opacity-50 rotate-180 z-10"
            />
        </section>
    );
};

export default Works;