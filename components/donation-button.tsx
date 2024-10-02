'use client'

const handleDonationClick = () => {
    window.open('https://buymeacoffee.com/himmah', '_blank');
}

const DonationButton = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                className="bg-green-500 text-white rounded-xl font-medium p-4 shadow-lg hover:bg-green-600 transition"
                onClick={handleDonationClick}
            >
                Make Donation
            </button>
        </div>
    )
}

export default DonationButton