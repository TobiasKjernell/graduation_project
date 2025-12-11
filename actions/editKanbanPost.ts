'use server'

import z from "zod";
import { kanbanPostSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server";

export enum idProject {
    slotcarracing = 1,
    numberops = 2,
    website = 3      
}

export const EditKanbanPost = async({ticketId, createInfo}: {createInfo: z.infer<typeof kanbanPostSchema>, ticketId: number,}) => {
    const parsedData = kanbanPostSchema.parse(createInfo);
    const isValid = kanbanPostSchema.safeParse(parsedData);
    console.log('tep')  
    if (isValid) {
        const supabase = await createClient();
        const {data, error} = await supabase.from(`kanbanPosts_${parsedData.project as idProject}`)
        .update({status:parsedData.status, assigned:parsedData.assigned, content: parsedData.content, tester: parsedData.tester, tester_feedback: parsedData.testerFeedback })
        .eq('id', ticketId).select('*').single();
        if(error) throw new Error(error.message)        
    }
}                   