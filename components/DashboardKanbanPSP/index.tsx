'use client'

import { createClient } from "@/lib/supabase/client";
import { SingleKanbanPost } from "@/lib/supabase/queriesClient";
import { useEffect, useState } from "react";
import { useTicketEdit } from "./context/useTicketContext";
import DashboardKanbanColumns from "./DashboardKanbanColumn";
import DashboardKanbanEdit from "./DashboardKanbanEdit";
import { KanbanColumns } from "@/lib/supabase/queries";
import DashboardKanbanCreate from "./DashboardKanbanCreate";

export interface IKanbanColumn {
    name: string,
    color: string,
}

const DashboardKanbanPSP = ({ posts, columns, }: { posts: SingleKanbanPost[], columns: KanbanColumns }) => {

    const sortColumns = columns.sort((a, b) => a.position_id - b.position_id)
    const [currentPosts, setCurrentPosts] = useState<SingleKanbanPost[]>(posts)
    const [isOnline, setIsOnline] = useState<string>('')
    const { isEditing } = useTicketEdit()

    useEffect(() => {
        const supabase = createClient();
        const channel = supabase
            .channel(`game_project_${columns[0].project_id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: `kanbanPosts_${columns[0].project_id}`,
                },
                (payload) => {
                    let kan = payload.new as SingleKanbanPost;
                    switch (payload.eventType) {
                        case "INSERT":
                            setCurrentPosts((e) => [...e, kan])
                            break;
                        case "UPDATE":
                            setCurrentPosts((e) => [...e.map(item => item.id === kan.id ? kan : item)])
                            break;
                        case "DELETE":
                            kan = payload.old as SingleKanbanPost;
                            setCurrentPosts((e) => [...e.filter(item => item.id !== kan.id)])
                            break;
                    }
                }
            )
            .subscribe((status) => { setIsOnline(status); })

        return () => { supabase.removeChannel(channel) }
    }, [])

    return (
        <>

            <div className="flex flex-col w-full  psp-text-jura gap-2">
                {isEditing && <DashboardKanbanEdit />}
                <h2 className="flex gap-2 text-xl">Kanban status:
                    <p className={isOnline === 'SUBSCRIBED' ? 'text-green-400' : 'text-red-500'}>{isOnline === 'SUBSCRIBED' ? 'Connected' : 'Disconnected'} </p>
                </h2>
                <DashboardKanbanCreate project={columns[0].project_id!} />
                <div className="grid grid-cols-1 grid-rows-none xl:grid-cols-7 xl:grid-rows-1 w-full gap-5 text-white">
                    {columns.map(item => <DashboardKanbanColumns key={item.name} posts={currentPosts} column={item} options={sortColumns} />)}
                </div>
            </div>

        </>
    )
}

export default DashboardKanbanPSP;      