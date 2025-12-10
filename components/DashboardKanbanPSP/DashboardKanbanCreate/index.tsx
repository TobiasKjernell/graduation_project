'use client'

import { CreateKanbanPost } from "@/actions/createKanbanPost";
import { kanbanPostSchema } from "@/actions/schemas"
import { getUsers } from "@/lib/supabase/queriesClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StickyNoteIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

const DashboardKanbanCreate = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    return (
        <>
            {isCreating && <CreateForm creating={setIsCreating} />}
            <div>
                <button onClick={() => setIsCreating(true)} className="flex cursor-pointer border p-2 rounded-sm psp-border-color gap-2 hover:text-zinc-300 ">
                    <StickyNoteIcon className="psp-text-gold" />
                    Create ticket
                </button>
            </div>
        </>
    )
}


const CreateForm = ({ creating }: { creating: Dispatch<SetStateAction<boolean>> }) => {

    const { register,reset, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(kanbanPostSchema),defaultValues: { status: 'planned'} })
    const { data, error } = useQuery({
        queryFn: getUsers,
        queryKey: ['users']
    })

    const { mutate, error:mut } = useMutation({
        mutationFn: CreateKanbanPost,
        onSuccess: () => {reset(); creating(false)},
        onError: () => console.log('... ')
    })

    return <div className="absolute h-full w-full bg-black/30 top-0 right-0 flex flex-col justify-center items-center backdrop-blur-md psp-text-jura text-white">
        <form className="bg-zinc-800 w-1/4 text-lg" onSubmit={handleSubmit(values => {
            mutate({
                content: values.content,
                assigned: values.assigned,
                status: values.status,
            })  
        })}>
            <fieldset className="flex flex-col bg-zinc-800 border-b">
                <div className="flex">
                <label className="">Assign:</label>
                <select defaultValue={'Tobias'} className="w-full bg-zinc-800 text-center">
                    {data && data.data?.map((user, index) => <option key={index} value={user.name!} {...register('assigned')}>{user.name}</option>)}
                </select>
                </div>
                  {errors.assigned && <div className="bg-red-500 text-xs">{errors.assigned.message}</div>}
            </fieldset>
            <fieldset className="flex flex-col">
                <label className="border-b">Content</label>
                <textarea className="p-2 bg-zinc-700" id="content" {...register('content')}></textarea>
                {errors.content && <div className="bg-red-500 text-xs">{errors.content.message}</div>}
            </fieldset>     
            <fieldset className="flex justify-between px-2"> 
                <button onClick={(e) => { e.preventDefault(); reset(); creating(false) }}>Cancel</button>
                <button>Create</button>
            </fieldset>
        </form>


    </div>
}
export default DashboardKanbanCreate;