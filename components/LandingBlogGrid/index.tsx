import { getLandingPagePosts } from "@/lib/supabase/queries";
import BlogCard from "../BlogCard";

const LandingBlogGrid = async () => {
    const { data, error } = await getLandingPagePosts();
    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 grid-rows-2 gap-5 p-5 w-full h-full'>
            {data && data.map(item => <BlogCard key={item.id} {...item} />)}
        </div>
    )
}   

export default LandingBlogGrid;         