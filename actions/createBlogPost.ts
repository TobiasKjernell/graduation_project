'use server'

import z from "zod"
import { blogPostSchema } from "./schemas"
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { updateTag } from "next/cache";
import { uploadImages } from "@/lib/supabase/imageUpload";


export const CreateBlogPost = async ({ createInfo }: { createInfo: z.infer<typeof blogPostSchema> }) => {
    const parsedData = blogPostSchema.parse(createInfo);
    const isValid = blogPostSchema.safeParse(parsedData)

    if (isValid.success) {
        const slug = slugify(parsedData.title);
        const imageFiles = createInfo.images!.getAll('image');
        const imagePublicUrls = imageFiles && imageFiles.length > 0 ? await uploadImages(imageFiles as File[]) : null;

        const supabase = await createClient();
        const { error } = await supabase.from('posts').insert([{
            slug: slug, image_url: imagePublicUrls, title: parsedData.title, project_id: Number(parsedData.project), author: parsedData.author, content: parsedData.content
        }])

        if (error) throw new Error(error.message)

        updateTag('blogs');
        updateTag('landing-posts')
    }
}