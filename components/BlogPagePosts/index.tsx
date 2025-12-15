import { getPosts } from "@/lib/supabase/queries";
import BlogCard from "../BlogCard"


export const revalidate = 3600;
const BlogPagePosts = async () => { 
   
    const { data, error } = await getPosts();
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 border p-5 psp-border-color shadow-2xl shadow-black psp-background-dark w-full h-full">
            {data && data.map(item => <BlogCard key={item.id} {...item} />)}
        </div>
    )
}

export default BlogPagePosts;