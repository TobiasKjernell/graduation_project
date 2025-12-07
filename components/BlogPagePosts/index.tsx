import { getPosts } from "@/lib/supabase/queries";
import BlogCard from "../BlogCard"
import { cacheTag } from "next/cache";

export const revalidate = 1000;
const BlogPagePosts = async () => {
   
    const { data, error } = await getPosts();
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 border p-5 psp-border-color shadow-2xl shadow-black psp-background-dark">
            {data && data.map(item => <BlogCard key={item.id} {...item} />)}
            {data && data.map(item => <BlogCard key={item.id} {...item} />)}
            {data && data.map(item => <BlogCard key={item.id} {...item} />)}
        </div>
    )
}

export default BlogPagePosts;