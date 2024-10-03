'use client'

import { Button } from "./ui/button";

const handleDonationClick = () => {
    window.open('https://buymeacoffee.com/himmah', '_blank');
}

interface DonationButtonProps {
    position?: string
    className?: string
}

const DonationButton = ({ position, className }: DonationButtonProps) => {
    return (
        <div className={position}>
            <Button size={"lg"} variant="shine" className={`rounded-xl font-medium p-4 text-lg ${className}`} onClick={handleDonationClick}>
                Support Us 🪙
            </Button>
        </div>

    )
}

export default DonationButton