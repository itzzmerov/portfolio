import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
    const text = "Loading...";
    const { loading } = useLoader();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer;

        if (loading) {
            setVisible(true);
        } else {
            // Keep loader visible for 3s before disappearing
            timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [loading]);

    if (!visible) return null;

    return (
        <div className="fixed top-0 z-[1000] w-full h-screen ">
            <div className="flex justify-center items-center h-screen bg-gray-50/90">
                <h1 className="text-4xl font-bold flex space-x-1">
                    {text.split("").map((letter, index) => (
                        <span
                            key={index}
                            className="wave-letter"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {letter}
                        </span>
                    ))}
                </h1>
            </div>

        </div>
    );
};

export default GlobalLoader;