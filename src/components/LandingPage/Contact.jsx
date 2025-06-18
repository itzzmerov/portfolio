const Contact = () => {
    return (
        <section id="contact" className="py-16 bg-[#EFFAFD]">
            <h2 className="text-center text-4xl font-bold text-[#001D42] mb-8">Contact Me</h2>
            <form className="max-w-md mx-auto">
                <input type="text" placeholder="Name" className="w-full p-3 border mb-4 rounded" />
                <input type="email" placeholder="Email Address" className="w-full p-3 border mb-4 rounded" />
                <textarea placeholder="Message" className="w-full p-3 border mb-4 rounded"></textarea>
                <button className="bg-[#70004C] text-white w-full py-3 rounded">Submit</button>
            </form>
        </section>
    );
};

export default Contact;