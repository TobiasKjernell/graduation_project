import Link from "next/link";
import { Suspense } from "react";
import LandingSpinner from "../LandingSpinner";

const LandingBlog = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex flex-col h-full items-center justify-top'>
            <div className="flex items-center justify-between w-full mt-5 shadow-2xl">
                <h2 className='font-semibold text-2xl ml-5 psp-text-jura'>Latest posts</h2>
                <h3 className="hidden xl:block psp-text-asi text-3xl">Polarbear Sandbox Production</h3>
                <Link href={'/blog'} className="psp-text-gold px-5 hover:underline text-2xl psp-text-jura">Visit blog page &#8594;</Link>
            </div>
            <Suspense fallback={<LandingSpinner />}>
                {children}
            </Suspense>
        </div>
    )
}

export default LandingBlog;     