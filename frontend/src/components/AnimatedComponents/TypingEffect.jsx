import { useEffect, useState } from 'react';

const TypingEffect = ({
    texts = ["a Web Developer", "an IT Instructor", "A Web Designer"],
    typingSpeed = 100,
    deleteSpeed = 60,
    pauseDuration = 2000
}) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        const currentText = texts[textIndex];

        if (!isDeleting && displayedText.length < currentText.length) {
            timeout = setTimeout(() => {
                setDisplayedText(currentText.substring(0, displayedText.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && displayedText.length === currentText.length) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseDuration);
        } else if (isDeleting && displayedText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayedText(currentText.substring(0, displayedText.length - 1));
            }, deleteSpeed);
        } else if (isDeleting && displayedText.length === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, texts, textIndex, typingSpeed, deleteSpeed, pauseDuration]);

    return (
        <h1 className="text-3xl tablet:text-4xl laptop-large:text-6xl font-titillium font-bold text-custom-black">
            {displayedText}
            <span className="animate-pulse">|</span>
        </h1>
    );
};

export default TypingEffect;
