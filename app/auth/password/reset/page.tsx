import Image from "next/image";

import Logo from "@/components/logo";
import Separator from "@/components/seperator";
import OauthSignIn from "@/components/oauth";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";

const ResetPasswordPage = () => {
    return (
        <div className="flex h-screen max-h-screen bg-[#303030]">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px] flex flex-row gap-10">
                    <Logo hideOnSmallDevice={false} />
                    <ForgotPasswordForm />
                    {/* <div>
                        <Separator text="OR CONTINUE WITH" />
                        <OauthSignIn />
                    </div> */}
                </div>
            </section>

            <Image
                src="/himmah-banner.jpg"
                height={1000}
                width={1000}
                alt="side image"
                className="side-img w-[60%]"
                priority={true}
            />
        </div>
    )
}

export default ResetPasswordPage