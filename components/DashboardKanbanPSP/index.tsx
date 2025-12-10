'use client'

import { createClient } from "@/lib/supabase/client";
import { KanbanColumns, SingleKanbanPost } from "@/lib/supabase/queriesClient";
import { useEffect, useState } from "react";
import { useTicketEdit } from "./context/useTicketContext";
import DashboardKanbanColumns from "./DashboardKanbanColumn";
import DashboardKanbanCreate from "./DashboardKanbanCreate";
import DashboardKanbanEdit from "./DashboardKanbanEdit";

export interface IKanbanColumn {
    name: string,
    color: string,
}

const DashboardKanbanPSP = ({ posts, columns }: { posts: SingleKanbanPost[], columns: KanbanColumns }) => {
    const sortColumns = columns.sort((a, b) => a.position_id - b.position_id)
    const [currentPosts, setCurrentPosts] = useState<SingleKanbanPost[]>(posts)
    const [isOnline, setIsOnline] = useState<string>('')
    const { isEditing } = useTicketEdit()
    useEffect(() => {

        const supabase = createClient();
        const channel = supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'kanbanPosts',
                },
                (payload) => {
                    let kan = payload.new as SingleKanbanPost;
                    switch (payload.eventType) {
                        case "INSERT":
                            setCurrentPosts((e) => [...e, kan])
                            break;
                        case "UPDATE":
                            setCurrentPosts((e) => [...e.filter(item => item.id !== kan.id), kan])
                            break;
                        case "DELETE":
                            kan = payload.old as SingleKanbanPost;
                            setCurrentPosts((e) => [...e.filter(item => item.id !== kan.id)])
                            break;
                    }
                }
            )
            .subscribe((status) => setIsOnline(status))

        return () => { supabase.removeChannel(channel) }
    }, [])

    return (
        <>
            {isEditing && <DashboardKanbanEdit />}
            <div className="flex flex-col w-full  psp-text-jura gap-2">
                <h2 className="flex gap-2 text-xl">Kanban status:
                    <p className={isOnline === 'SUBSCRIBED' ? 'text-green-400' : 'text-red-500'}>{isOnline === 'SUBSCRIBED' ? 'Connected' : 'Disconnected'} </p>
                </h2>
                <DashboardKanbanCreate />
                <div className="grid grid-cols-1 grid-rows-none xl:grid-cols-7 xl:grid-rows-1 w-full gap-5 text-white">
                    {columns.map(item => <DashboardKanbanColumns key={item.name} posts={currentPosts} column={item} options={sortColumns} />)}
                </div>
            </div>

        </>
    )
}

export default DashboardKanbanPSP;      