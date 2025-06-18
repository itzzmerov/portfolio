import { useEffect, useState } from 'react';

const TypingEffect = ({ text = "a Web Developer", typingSpeed = 100, deleteSpeed = 60, pauseDuration = 5000 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (!isDeleting && displayedText.length < text.length) {
            timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && displayedText.length === text.length) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseDuration);
        } else if (isDeleting && displayedText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length - 1));
            }, deleteSpeed);
        } else if (isDeleting && displayedText.length === 0) {
            setIsDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, text, typingSpeed, pauseDuration, deleteSpeed]);

    return (
        <h1 className="text-6xl font-titillium font-bold text-custom-black">
            {displayedText}
            <span className="animate-pulse">|</span>
        </h1>
    );
};

export default TypingEffect;
