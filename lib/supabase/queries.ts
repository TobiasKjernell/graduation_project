import { QueryData } from "@supabase/supabase-js";
import { createClient } from "./client"
import { cacheLife, cacheTag } from "next/cache";
import { idProject } from "@/actions/editKanbanPost";

export const getAllColumns = (project_id: idProject) => {
    const supabase = createClient()
    return supabase.from(`kanbanColumns_${project_id}`).select('*');
}
//Posts
export const getPosts = async () => {
    'use cache'
    cacheTag('blogs');
    cacheLife({
        stale: 120,
        revalidate: 125,
    })

    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*').order('created_at', { ascending: false })

    return { data, error }
}

export const getSinglePost = async (slug: string) => {

    const supabase = createClient();
    return await supabase.from('posts')
        .select('*')
        .eq('slug', slug)
        .single();
}

export const getLandingPagePosts = async () => {

    'use cache'
    cacheTag('landing-posts')
    cacheLife({
        stale: 120,
        revalidate: 125,
    })
    const supabase = createClient();
    return await supabase.from('posts').select('*').range(0, 5).order('created_at', { ascending: false })
}

//Levels
export const getLevelsByProject = async (projectId: number) => {

    'use cache'
    cacheTag(`levels-${projectId}`);
    cacheLife({
        stale: 120,
        revalidate: 125,
    })
    const supabase = createClient();
    return supabase.from('levels').select('*').eq('project_id', projectId).order('created_at');
}

export const getLevel = async (levelId: number) => {
    const supabase = createClient();
    return supabase.from('levels').select('*').eq('id', levelId);
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type BlogPosts = QueryData<ReturnType<typeof getPosts>>
export type SinglePost = QueryData<ReturnType<typeof getSinglePost>>
export type KanbanColumns = QueryData<ReturnType<typeof getAllColumns>>  
