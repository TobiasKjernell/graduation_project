'use client'

import { UpdateKanbanPost } from "@/actions/updateKanbanPost"
import {  SingleKanbanPost } from "@/lib/supabase/queriesClient"
import { useMutation } from "@tanstack/react-query"
import { Mail, Settings } from "lucide-react"
import { useTicketEdit } from "../context/useTicketContext"
import { KanbanColumns } from "@/lib/supabase/queries"

interface IKanbanCard {
    status: string,
    options: KanbanColumns
    post: SingleKanbanPost
}

const DashboardKanbanCard = ({ status, options, post }: IKanbanCard) => {
    const { toggleEditing, handleSetTicket, isEditing } = useTicketEdit();
    const { mutate, isPending, error } = useMutation({
        mutationFn: UpdateKanbanPost
    })

    return (
        <div className="p-2 border m-2 flex flex-col gap-2 bg-zinc-900 rounded-sm">
            <div className="flex gap-2">
                <select defaultValue={status} onChange={(e) => mutate({
                    id: post.id,
                    updateKanbanPost:
                    {
                        status: e.currentTarget.value,
                        assigned: post.assigned!,
                        content: post.content!,  
                        project: post.project_id               
                    }
                })} className="bg-zinc-900 border w-full capitalize">
                    {options && options.map(optionValue => <option key={optionValue.name} value={optionValue.name}>{optionValue.name}</option>)}
                </select>
                <button onClick={() => { handleSetTicket(post); toggleEditing(); console.log(isEditing) }} className="cursor-pointer">
                    <Settings className="hover:text-zinc-400" />
                </button>
            </div>
            <h3 className="text-[14px]">{isPending ? 'Syncing..' : post.content}</h3>
            <div className="flex text-sm psp-text-gold items-center justify-between">
                {post.tester && post.tester !== 'none' ? <h4 className="text-sm psp-text-gold">Tester: {post.tester}</h4> : ''}
                {post.tester_feedback && <Mail />}
            </div>
            <div className="flex text-sm psp-text-gold items-center justify-between">
                <h4 className="text-sm psp-text-gold">Assigned to: {post.assigned}</h4>
                <span className="flex text-white">#<div className="psp-text-gold">{post.id}</div></span>
            </div>
        </div>
    )
}

export default DashboardKanbanCard