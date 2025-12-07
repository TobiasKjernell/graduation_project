import BlogPagePosts from "@/components/BlogPagePosts";
import LandingNavbar from "@/components/LandingNavbar";
import LandingSpinner from "@/components/LandingSpinner";
import { Suspense } from "react";

const BlogPage = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="psp-background-dark">
                    <LandingNavbar />
                </div>
                <div className="psp-linear-background p-10 flex-1 flex flex-col items-center gap-5">
                    <h1 className="text-3xl psp-text-jura psp-text-gold">News and updates from our projects</h1>
                    <Suspense fallback={<LandingSpinner />}>
                        <BlogPagePosts />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default BlogPage;