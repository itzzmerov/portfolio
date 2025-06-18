import React from 'react'
import Navbar from './LandingPage/Navbar'
import Hero from './LandingPage/Hero'
import About from './LandingPage/About'
import Works from './LandingPage/Works'
import Contact from './LandingPage/Contact'
import Footer from './LandingPage/Footer'

const PortfolioLayout = () => {
    return (
        <div className='bg-custom-white'>
            <Navbar />
            <Hero />
            <About />
            <Works />
            <Contact />
            <Footer />
        </div>
    )
}

export default PortfolioLayout
