'use server'

import z from "zod"
import { blogPostSchema } from "./schemas"
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { updateTag } from "next/cache";
import { uploadImages } from "@/lib/supabase/imageUpload";
import { redirect } from "next/navigation";



export const EditBlogPost = async ({ updateInfo, currentImages, postId }: { postId: number, updateInfo: z.infer<typeof blogPostSchema>, currentImages: string[] | null }) => {
    const parsedData = blogPostSchema.parse(updateInfo);
    const isValid = blogPostSchema.safeParse(parsedData)

    if (isValid.success) {
        const supabase = await createClient();
        const imageFile = updateInfo.images?.getAll('image');
        let imagePublicUrl;
        if (imageFile?.every(item => (typeof item !== 'string') && item !== undefined)) {

            if (!isValid.success) return { error: 'Malformed image file' }

            imagePublicUrl = await uploadImages(imageFile as File[]);
            if (currentImages != null) imagePublicUrl.push(...currentImages);
        } else { imagePublicUrl = currentImages }

        const { error: updateError } = await supabase.from('posts').update({ title: updateInfo.title, content: updateInfo.content, project_id: Number(updateInfo.project), author: updateInfo.author, image_url: imagePublicUrl, slug: slugify(parsedData.title) }).eq('id', postId).select('slug').single();

        if (updateError) return { error: updateError.message }
        updateTag('blogs')
        redirect('/blog')
    }
}