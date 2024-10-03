'use client'

import { Button } from "./ui/button";

const handleDonationClick = () => {
    window.open('https://buymeacoffee.com/himmah', '_blank');
}

const DonationButton = () => {
    return (
        <div className="fixed bottom-4 right-4 z-10">
            <Button size={"lg"} variant="shine" className=" rounded-xl font-medium p-4 text-lg h-14" onClick={handleDonationClick}>
                Make Donation 🪙
            </Button>
        </div>

    )
}

export default DonationButton