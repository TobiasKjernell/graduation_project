'use server'

import { createClient } from "@/lib/supabase/server"
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";


export const DeleteBlogPost = async (postId:number) => {
    const supabase = await createClient();
    await supabase.from(`posts`).delete().eq('id', postId);

    updateTag('blogs')
    updateTag('landing-posts')
    redirect('/blog')
}   