'use client'

import { kanbanPostSchema } from "@/actions/schemas";
import { getUsers } from "@/lib/supabase/queriesClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTicketEdit } from "../context/useTicketContext";
import { EditKanbanPost } from "@/actions/editKanbanPost";
import DashboardKanbanDelete from "../DashboardKanbanDelete/index.tsx";

const DashboardKanbanEdit = () => {

    const { toggleEditing, handleSetTicket, currentTicket } = useTicketEdit();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(kanbanPostSchema), defaultValues:
        {
            status: currentTicket!.status!,
            content: currentTicket!.content!,
            assigned: currentTicket!.assigned!
        }
    })

    const { data, error } = useQuery({
        queryFn: getUsers,
        queryKey: ['users']
    })

    const { mutate } = useMutation({
        mutationFn: EditKanbanPost,
        onSuccess: () => { reset(); toggleEditing() },
    })

    const handleCancel = () => {
        toggleEditing(); handleSetTicket(null); reset();
    }

    return <div className="absolute h-full w-full bg-black/30 top-0 right-0 flex flex-col justify-center items-center backdrop-blur-md psp-text-jura text-white">
        <form className="bg-zinc-900 w-auto text-lg border rounded-sm" onSubmit={handleSubmit(values => {
            mutate({
                ticketId: currentTicket!.id,
                createInfo: {
                    content: values.content,
                    assigned: values.assigned,
                    status: values.status,
                }
            })
        })}>
            <fieldset className="flex flex-col bg-zinc-900 border-b px-2">
                <div className="flex">
                    <label className="">Assign:</label>
                    <select {...register('assigned')} defaultValue={'Tobias'} className="w-full bg-zinc-900 text-center">
                        {data && data.data?.map((user, index) => <option key={index} value={user.name!}>{user.name}</option>)}
                    </select>
                </div>
                {errors.assigned && <div className="bg-red-500 text-xs">{errors.assigned.message}</div>}
            </fieldset>
            <fieldset className="flex flex-col px-2">
                <label className="border-b">Content</label>
                <textarea className="p-2 min-h-60 bg-zinc-800" id="content" {...register('content')}></textarea>
                {errors.content && <div className="bg-red-500 text-xs">{errors.content.message}</div>}
            </fieldset>
            <fieldset className="flex justify-between px-2">
                <button className="cursor-pointer hover:text-zinc-300" onClick={(e) => { e.preventDefault(); handleCancel(); }}>Cancel</button>
                <DashboardKanbanDelete />
                <button className="cursor-pointer hover:text-zinc-300">Edit</button>
            </fieldset>
        </form>
    </div>

}

export default DashboardKanbanEdit;