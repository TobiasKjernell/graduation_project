'use server'

import z from "zod";
import { kanbanPostSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server";
import { UpdateTypeEnum } from "@/components/DashboardKanbanPSP";

export enum idProject {
    slotcarracing = 1,
    numberops = 2,
    website = 3      
}

export const EditKanbanPost = async({ticketId, createInfo, updateType}: {createInfo: z.infer<typeof kanbanPostSchema>, ticketId: number, updateType:UpdateTypeEnum}) => {
    const parsedData = kanbanPostSchema.parse(createInfo);
    const isValid = kanbanPostSchema.safeParse(parsedData);
 
    if (isValid) {
        const supabase = await createClient();
        const {data, error} = await supabase.from(`kanbanPosts_${parsedData.project as idProject}`)
        .update({status:parsedData.status, assigned:parsedData.assigned, content: parsedData.content, tester: parsedData.tester, tester_feedback: parsedData.testerFeedback, updateType: updateType })
        .eq('id', ticketId).select('*').single();
        if(error) throw new Error(error.message)        
    }
}                   