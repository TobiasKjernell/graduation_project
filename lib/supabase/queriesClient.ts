import { QueryData } from "@supabase/supabase-js";
import { createClient } from "./client";
import { idProject } from "@/actions/editKanbanPost";


export const singleKanbaPost = (project_id:idProject) => {
    const supabase = createClient();
    return supabase.from(`kanbanPosts_${project_id}`).select('*').single();
}

export const getUsers = async() => {
    const supabase = createClient();
    return supabase.from('crew').select('name');
}

export const allKanbanPosts = async(project_id: idProject) => {
    const supabase = createClient();
    return supabase.from(`kanbanPosts_${project_id}`).select('*');
}

export type SingleKanbanPost = QueryData<ReturnType<typeof singleKanbaPost>>  
export type KanbanPosts = QueryData<ReturnType<typeof allKanbanPosts>>