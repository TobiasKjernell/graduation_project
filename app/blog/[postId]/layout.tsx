import LandingNavbar from "@/components/LandingNavbar";
import LandingSpinner from "@/components/LandingSpinner";
import Link from "next/link";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="psp-background-dark">
                <LandingNavbar />
            </div>
            <div className="psp-linear-background p-10 flex-1 flex flex-col items-center gap-5">
                <Link className="psp-text-gold text-2xl psp-text-jura border p-2 psp-border-color rounded-2xl hover:text-white" href={'/blog'}>&larr; Back to all posts</Link>
                <Suspense fallback={<LandingSpinner />}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}

export default Layout;