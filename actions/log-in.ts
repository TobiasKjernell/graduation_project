'use server'

import { z } from 'zod';
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from './schemas';
import { redirect } from 'next/navigation';


export const LogIn = async (userDataValues: z.infer<typeof loginSchema>) => {

    console.log('ep')
    const parsedData = loginSchema.parse(userDataValues);
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(parsedData);

    if (error) return { error: error.message }
    redirect('/');
}   