'use server'

import z from "zod";
import { kanbanPostSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server";
import { idProject } from "./editKanbanPost";

export const CreateKanbanPost = async(createInfo: z.infer<typeof kanbanPostSchema>) => {
    const parsedData = kanbanPostSchema.parse(createInfo);
    const isValid = kanbanPostSchema.safeParse(parsedData);
    console.log('yep')
    if (isValid) {
        const supabase = await createClient();
        const {data, error} = await supabase.from(`kanbanPosts_${createInfo.project as idProject}`).insert([{status:parsedData.status, assigned:parsedData.assigned, content: parsedData.content, project_id: parsedData.project }])
        if(error) throw new Error(error.message)    
    }
}           