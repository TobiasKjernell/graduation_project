import { QueryData } from "@supabase/supabase-js";
import { createClient } from "./client"

//Posts
export const getPosts = async () => {
    const supabase = createClient();
   const {data, error} =  await supabase
        .from('posts')
        .select('*')

    return {data, error}
}

export const getSinglePost = async (id: number) => {
    const supabase = createClient();
    return await supabase.from('posts')
        .select('*')
        .eq('id', id)
        .single();
}

export const getLandingPagePosts = async() => {
    const supabase = createClient();        
    return await supabase.from('posts').select('*').range(0, 5).order('created_at', {ascending:false})
}

//Levels
export const getLevelsByProject = async(projectId:number) => {
    const supabase = createClient();
    return supabase.from('levels').select('*').eq('project_id', projectId).order('created_at');
}

export const getLevel = async(levelId:number)  => {     
    const supabase = createClient();
    return supabase.from('levels').select('*').eq('id', levelId);
}

function delay(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type BlogPosts = QueryData<ReturnType<typeof getPosts>>          
export type SinglePost = QueryData<ReturnType<typeof getSinglePost>>