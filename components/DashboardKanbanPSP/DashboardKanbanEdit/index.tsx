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
            assigned: currentTicket!.assigned!,
            tester: currentTicket!.tester ? currentTicket!.tester : 'none',
            testerFeedback: currentTicket!.tester_feedback ? currentTicket!.tester_feedback : '',
            project: currentTicket?.project_id
        }
    })

    const { data, error: errorUsers } = useQuery({
        queryFn: getUsers,
        queryKey: ['users']
    })

    const { mutate, isPending, error: errorEdit } = useMutation({
        mutationFn: EditKanbanPost,
        onSuccess: () => { reset(); toggleEditing() },
    })

    const handleCancel = () => {
        toggleEditing(); handleSetTicket(null); reset();
    }
    
    return <div className="fixed h-screen w-full bg-black/30 top-0 right-0 flex flex-col justify-center items-center backdrop-blur-md psp-text-jura text-white">
        <form className="bg-zinc-900 w-auto text-lg border rounded-sm" onSubmit={handleSubmit(values => {
            mutate({
                ticketId: currentTicket!.id,
               
                createInfo: {
                    content: values.content,
                    assigned: values.assigned,
                    status: values.status,
                    tester: values.tester === 'none' || values.tester === '' ? 'none' : values.tester,
                    testerFeedback: values.testerFeedback ? values.testerFeedback : '',
                    project: currentTicket!.project_id!
                }
            })
        })}>
            <fieldset className="flex items-center justify-between  bg-zinc-900 border-b px-2">
                {errorEdit && <div className="bg-red-500 text-xs">Cannot edit, server issues</div>}
                <div className="flex">
                    <label className="">Assign:</label>
                    {errorUsers ?
                        <div className="bg-red-500 text-xs">Cannot get users </div>
                        :
                        <select {...register('assigned')} defaultValue={'Tobias'} className="w-full bg-zinc-900 text-center">
                            {data && data.data?.map((user, index) => <option key={index} value={user.name!}>{user.name}</option>)}
                        </select>
                    }
                    {errors.tester && <div className="bg-red-500 text-xs">{errors.tester.message}</div>}
                </div>
                <div className="flex">
                    <label className="">Tester:</label>
                    {errorUsers ?
                        <div className="bg-red-500 text-xs">Cannot get users </div>
                        :
                        <select {...register('tester')} className="w-full bg-zinc-900 text-center">
                            <option value={'none'}>None</option>
                            {data && data.data?.map((user, index) => <option key={index} value={user.name!}>{user.name}</option>)}
                        </select>
                    }
                    {errors.tester && <div className="bg-red-500 text-xs">{errors.tester.message}</div>}
                </div>

            </fieldset>
            <div className="flex">
                <fieldset className="flex flex-col px-2">
                    <label className="border-b">Content</label>
                    <textarea disabled={isPending} className="p-2 min-h-60 bg-zinc-800" id="content" {...register('content')}></textarea>
                    {errors.content && <div className="bg-red-500 text-xs">{errors.content.message}</div>}
                </fieldset>
                <fieldset className="flex flex-col px-2">
                    <label className="border-b">Test notes</label>
                    <textarea disabled={isPending} className="p-2 min-h-60 bg-zinc-800" id="testerFeedback" {...register('testerFeedback')}></textarea>
                    {errors.testerFeedback && <div className="bg-red-500 text-xs">{errors.testerFeedback.message}</div>}
                </fieldset>
            </div>
            <fieldset className="flex justify-between px-2">
                <button disabled={isPending} className="cursor-pointer hover:text-zinc-300" onClick={(e) => { e.preventDefault(); handleCancel(); }}>Cancel</button>
                <DashboardKanbanDelete />
                <button disabled={isPending} className="cursor-pointer hover:text-zinc-300">Edit</button>
            </fieldset>
        </form>
        {errors && <div>{errors.root?.message} </div>}
    </div>

}

export default DashboardKanbanEdit;