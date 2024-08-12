import Logo from "@/components/logo";
import Separator from "@/components/seperator";
import OauthSignIn from "@/components/oauth";
import RegisterForm from "@/components/forms/register-form";

const RegisterPage = () => {
    return (
        <div className="flex h-screen max-h-screen bg-[#303030]">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px] flex flex-row gap-10">
                    <Logo hideOnSmallDevice={false} />
                    <RegisterForm />
                    <div>
                        <Separator text="OR CONTINUE WITH" />
                        <OauthSignIn />
                    </div>
                    {/* <div className="text-14-regular mt-20 flex justify-between">
                    <p className="justify-items-end xl:text-left">
                        By clicking continue, you agree to our <Link href='#' className='underline'>Terms of Service</Link> and <Link href='#' className='underline'>Privacy Policy</Link>
                    </p>
                </div> */}
                </div>
            </section>

            <img
                src='/public/tall-trees-taller-cliff.jpg'
                alt="Tall trees and cliff"
                className="side-img object-cover w-[60%]"
            />
        </div>
    )
}

export default RegisterPage