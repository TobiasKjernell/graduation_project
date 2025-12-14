'use server'

import z from "zod"
import { blogPostSchema } from "./schemas"
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { updateTag } from "next/cache";

export const CreateBlogPost = async ({ createInfo }: { createInfo: z.infer<typeof blogPostSchema> }) => {
    const parsedData = blogPostSchema.parse(createInfo);
    const isValid = blogPostSchema.safeParse(parsedData)

    if (isValid.success) {
        const slug = slugify(parsedData.title);
        const supabase = await createClient();
        const { error } = await supabase.from('posts').insert([{
            slug: slug, image_url: null, title: parsedData.title, project_id: Number(parsedData.project), author: parsedData.author, content: parsedData.content
        }])

        if (error) throw new Error(error.message)

            updateTag('blogs')
    }
}