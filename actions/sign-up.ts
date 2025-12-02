'use server'

import { redirect } from "next/navigation";
import { z } from "zod"
import { signUpSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server";

export const SignUp = async (userDataValues: z.infer<typeof signUpSchema>) => {

    const parsedData = signUpSchema.parse(userDataValues);
    const supabaseServer = await createClient()
    const { data: { user }, error: userError } = await supabaseServer.auth.signUp({
        email: parsedData.email,
        password: parsedData.password,
        options: {      
            data: {
                display_name: parsedData.username
            }
        }
    })

    if (userError) return { error: userError }
    
    redirect('/')

}       