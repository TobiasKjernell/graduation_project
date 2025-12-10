'use server'

import { createClient } from "@/lib/supabase/server"

export const DeleteTicket = async (ticketId: number) => {
    const supabase = await createClient();
    await supabase.from('kanbanPosts').delete().eq('id', ticketId);
}   