import { QueryData } from "@supabase/supabase-js";
import { createClient } from "./client";

export const allKanbanPosts = () => {
    const supabase = createClient();
    return supabase.from('kanbanPosts').select('*');
}

export const getAllColumns = () => {
    const supabase = createClient()
    return supabase.from('kanbanColumns').select('*');
}

export const singleKanbaPost = () => {
    const supabase = createClient();
    return supabase.from('kanbanPosts').select('*').single();
}

export const getUsers = async() => {
    const supabase = createClient();
    return supabase.from('Crew').select('name');
}


export type KanbanPosts = QueryData<ReturnType<typeof allKanbanPosts>>  
export type SingleKanbanPost = QueryData<ReturnType<typeof singleKanbaPost>>  
export type KanbanColumns = QueryData<ReturnType<typeof getAllColumns>>  