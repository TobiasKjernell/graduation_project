'use server'

import { z } from 'zod'
import { levelSchema } from './schemas'
import { revalidatePath, updateTag } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getUpateTagProjectId } from '@/lib/utils';

export const UpdateLevel = async ({ id, updateInfo, project_id }: { id: number, updateInfo: z.infer<typeof levelSchema>, project_id:number }) => {
    const parsedData = levelSchema.parse(updateInfo);

    const supabase = await createClient();

    const { error } = await supabase.from('levels').update({ status: parsedData.status }).eq('id', id).select('status').single();

    if (error) throw new Error(error.message);
    updateTag(`levels-${getUpateTagProjectId(project_id)}`)   
}                               