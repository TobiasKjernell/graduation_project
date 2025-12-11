'use server'

import { createClient } from "@/lib/supabase/server"
import { idProject } from "./editKanbanPost";

export const DeleteTicket = async ({ticketId, projectId}: {ticketId:number, projectId:idProject}) => {
    const supabase = await createClient();
    await supabase.from(`kanbanPosts_${projectId}`).delete().eq('id', ticketId);
}   