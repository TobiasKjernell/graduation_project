'use server'

import z from "zod";
import { kanbanPostSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server";

export const CreateKanbanPost = async(createInfo: z.infer<typeof kanbanPostSchema>) => {
    const parsedData = kanbanPostSchema.parse(createInfo);
    const isValid = kanbanPostSchema.safeParse(parsedData);

    if (isValid) {
        const supabase = await createClient();
        const {data, error} = await supabase.from('kanbanPosts').insert([{status:parsedData.status, assigned:parsedData.assigned, content: parsedData.content }])
        if(error) throw new Error(error.message)    
    }
}   