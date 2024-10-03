import AuthButton from './auth-button'
import DonationButton from './donation-button'
import Logo from './logo'

const DashboardNavbar = () => {
    return (
        <nav className='flex-between h-[80px] fixed z-10 w-full bg-[#303030] py-4 px-4'>
            <Logo color='text-white' />

            <div className='flex gap-x-5'>
                <DonationButton className='h-12' />
                <AuthButton />
            </div>
        </nav>
    )
}

export default DashboardNavbar