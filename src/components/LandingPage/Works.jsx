const Works = () => {
    return (
        <section id="portfolio" className="py-16 bg-[#EFFAFD]">
            <h2 className="text-center text-4xl font-bold text-[#001D42] mb-8">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-[#1E2122] p-5 rounded">
                        <button className="bg-[#001D42] text-white w-full py-2">View Demo</button>
                        <button className="bg-[#70004C] text-white w-full py-2 mt-2">Source Code</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Works;