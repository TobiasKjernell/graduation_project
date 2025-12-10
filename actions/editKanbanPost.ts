'use server'

import z from "zod";
import { kanbanPostSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server";

export const EditKanbanPost = async({ticketId, createInfo}: {createInfo: z.infer<typeof kanbanPostSchema>, ticketId: number}) => {
    const parsedData = kanbanPostSchema.parse(createInfo);
    const isValid = kanbanPostSchema.safeParse(parsedData);

    if (isValid) {
        const supabase = await createClient();
        const {data, error} = await supabase.from('kanbanPosts')
        .update({status:parsedData.status, assigned:parsedData.assigned, content: parsedData.content })
        .eq('id', ticketId).select('*').single();
        if(error) throw new Error(error.message)    
    }
}           