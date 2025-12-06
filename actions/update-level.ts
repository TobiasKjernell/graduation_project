'use server'

import { z } from 'zod'
import { levelSchema } from './schemas'
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export const UpdateLevel = async ({ id, updateInfo }: { id: number, updateInfo: z.infer<typeof levelSchema> }) => {
    const parsedData = levelSchema.parse(updateInfo);

    const supabase = await createClient();

    const { error } = await supabase.from('levels').update({ status: parsedData.status }).eq('id', id).select('status').single();

    if (error) throw new Error(error.message);
    revalidatePath('/')
}                       