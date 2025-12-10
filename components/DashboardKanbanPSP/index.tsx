'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import DashboardKanbanColumns from "./DashboardKanbanColumn";
import { KanbanColumns, KanbanPosts, SingleKanbanPost } from "@/lib/supabase/queriesClient";
import DashboardKanbanCreate from "./DashboardKanbanCreate";

export interface IKanbanColumn {
    name: string,
    color: string,
}

export const mockColumns: IKanbanColumn[] = [
    {
        name: 'Planned',
        color: 'blue'
    },
    {
        name: 'In progress',
        color: 'limegreen'
    },
    {
        name: 'Ready to test',
        color: 'yellow'
    },
    {
        name: 'Testing',
        color: 'orange'
    },
    {
        name: 'Testing failed',
        color: 'red'
    },
    {
        name: 'Testing succeed',
        color: 'green'
    },
    {
        name: 'Done',
        color: 'purple'
    }
]

const DashboardKanbanPSP = ({ posts, columns }: { posts: SingleKanbanPost[], columns: KanbanColumns }) => {
    const sortColumns = columns.sort((a, b) => a.position_id - b.position_id)
    const [currentPosts, setCurrentPosts] = useState<SingleKanbanPost[]>(posts)
    const [isOnline, setIsOnline] = useState<string>('')
    // const { data } = useQuery({
    //     queryFn: allKanbanPosts,
    //     queryKey: ['allKanbanPosts'],
    // }
    // )

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
                    const kan = payload.new as SingleKanbanPost;
                    switch (payload.eventType) {
                        case "INSERT":
                            setCurrentPosts((e) =>[...e, kan])
                        case "UPDATE":
                            setCurrentPosts((e) =>[...e.filter(item => item.id !== kan.id), kan])
                        case "DELETE":
                    }
                }
            )
            .subscribe((status) => setIsOnline(status))
    
        return () => { supabase.removeChannel(channel) }
    }, [])


    return (
        <div className="flex flex-col w-full  psp-text-jura gap-2">
            <h2 className="flex gap-2 text-xl">Kanban status:
                <p className={isOnline === 'SUBSCRIBED' ? 'text-green-400' : 'text-red-500'}>{isOnline === 'SUBSCRIBED' ? 'Online' : 'Offline'} </p>
            </h2>
            <DashboardKanbanCreate />
            <div className="grid grid-cols-7 grid-rows-1 w-full gap-5 text-white">
                {columns.map(item => <DashboardKanbanColumns key={item.name} posts={currentPosts} column={item} options={sortColumns} />)}
            </div>
        </div>
    )
}

export default DashboardKanbanPSP;      