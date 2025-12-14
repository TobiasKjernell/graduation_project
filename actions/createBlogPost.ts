'use server'

import z from "zod"
import { blogPostSchema } from "./schemas"

export const CreateBlogPost = async({createInfo}: {createInfo: z.infer<typeof blogPostSchema >}) => {

}