import BlogPagePosts from "@/components/BlogPagePosts";
import DashboardCreatePost from "@/components/DashboardCreatePost";
import LandingNavbar from "@/components/LandingNavbar";
import LandingSpinner from "@/components/LandingSpinner";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export const generateMetadata = async () => {

    return {
        title: `Blog`
    }       
}

const BlogPage = async () => {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="psp-background-dark">
                    <LandingNavbar />
                </div>
                <div className="psp-linear-background p-10 flex-1 flex flex-col items-center gap-5">
                    {user && <DashboardCreatePost title="Create post" user={user.user_metadata.display_name} />}
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