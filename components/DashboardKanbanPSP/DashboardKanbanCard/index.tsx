'use client'

import { UpdateKanbanPost } from "@/actions/updateKanbanPost"
import { KanbanColumns, SingleKanbanPost } from "@/lib/supabase/queriesClient"
import { useMutation } from "@tanstack/react-query"
import { Settings } from "lucide-react"

interface IKanbanCard {
    status: string,
    options: KanbanColumns
    post: SingleKanbanPost
}

const DashboardKanbanCard = ({ status, options, post }: IKanbanCard) => {

    const { mutate, isPending, error } = useMutation({
        mutationFn: UpdateKanbanPost
    })
    return (    
        <div className="p-2 border m-2 flex flex-col gap-2 bg-zinc-900 rounded-sm">
            <div className="flex gap-2">
                <select defaultValue={status} onChange={(e) =>  mutate({
                        id: post.id,
                        updateKanbanPost:
                        {
                            status: e.currentTarget.value,  
                            assigned: post.assigned!,
                            content: post.content!,
                        }
                    })} className="bg-zinc-900 border w-full capitalize">
                    {options && options.map(optionValue => <option key={optionValue.name} value={optionValue.name}>{optionValue.name}</option>)}
                </select>
                <button className="cursor-pointer">
                    <Settings className="hover:text-zinc-400" />
                </button>
            </div>
            <h3 className="text-[14px]">{isPending ? 'Syncing..' : post.content}</h3>
            <h4 className="text-sm psp-text-gold">Assigned to: {post.assigned}</h4>
        </div>
    )
}

export default DashboardKanbanCard