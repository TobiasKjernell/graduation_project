'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import DashboardKanbanColumns from "./DashboardKanbanColumn";
import { KanbanColumns, KanbanPosts, SingleKanbanPost } from "@/lib/supabase/queriesClient";

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
                            setCurrentPosts([...currentPosts, kan])
                        case "UPDATE":
                            const postToUpdate = currentPosts.filter(item => item.id !== kan.id)
                            setCurrentPosts([...postToUpdate, kan])                 
                        case "DELETE":  
                    }
                }
                
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [currentPosts])


    return (
        <div className="flex w-full text-white psp-text-jura">
            <div className="grid grid-cols-7 grid-rows-1 w-full gap-5">
                {columns.map(item => <DashboardKanbanColumns key={item.name} posts={currentPosts} column={item} options={sortColumns} />)}
            </div>
        </div>
    )
}

export default DashboardKanbanPSP;      