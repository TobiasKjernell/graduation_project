import BlogCard from "@/components/BlogCard";
import LandingHeader from "@/components/LandingHeader";
import LandingNavbar from "@/components/LandingNavbar";

const BlogPage = () => {
    return (
        <>
            <div className="psp-background-dark shadow-2xl shadow-red-600 ">
                <LandingNavbar />       
            </div>
            <div className="psp-linear-background p-10 min-h-screen flex flex-col items-center gap-5">
                <h1 className="text-3xl psp-text-jura psp-text-gold">News and updates for our projects</h1>
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 border p-5 psp-border-color shadow-2xl shadow-black psp-background-dark">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </div>
        </>
    )
}

export default BlogPage;