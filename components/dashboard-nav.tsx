import AuthButton from './auth-button'
import Logo from './logo'

const DashboardNavbar = () => {
    return (
        <nav className='flex-between h-[80px] fixed z-50 w-full bg-[#303030] py-4 px-4'>
            <Logo color='text-white' />
            <div>
                <AuthButton />
            </div>
        </nav>
    )
}

export default DashboardNavbar