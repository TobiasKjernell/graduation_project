'use server'

import { createClient } from "@/lib/supabase/server";
import z from "zod";
import { kanbanPostSchema } from "./schemas";

export const UpdateKanbanPost = async ({ updateKanbanPost, id }: { updateKanbanPost: z.infer<typeof kanbanPostSchema>, id: number }) => {
    const parsedData = kanbanPostSchema.parse(updateKanbanPost);
    const isValid = kanbanPostSchema.safeParse(parsedData);

    if (isValid) {
        const supabase = await createClient();
        const { error } = await supabase.from('kanbanPosts').update({ status: parsedData.status }).eq('id', id).select('*').single();
        if (error) throw new Error(error.message)
    }

}                                               