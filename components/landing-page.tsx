'use client'

import SmoothScrolling from './smooth-scroll'
import Hero from './sections/hero'
import About from './sections/about'
import Features from './sections/features'
import Benefits from './sections/benefits'
import Goals from './sections/goals'
import Footer from './footer'

const LandingPage = () => {

    const handleDonationClick = () => {
        window.open('https://buymeacoffee.com/himmah', '_blank');
    }

    return (
        <>
            <SmoothScrolling>
                <Hero />
                <About />
                <Features />
                <Benefits />
                <Goals />
                <Footer />
            </SmoothScrolling>
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    className="bg-green-500 text-white rounded-xl font-medium p-4 shadow-lg hover:bg-green-600 transition"
                    onClick={handleDonationClick}
                >
                    Make Donation
                </button>
            </div>
        </>
    )
}

export default LandingPage