import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardKanbanPSP from "@/components/DashboardKanbanPSP";
import { EditTicketProvider } from "@/components/DashboardKanbanPSP/context/useTicketContext";
import LandingSpinner from "@/components/LandingSpinner";
import {  getAllColumns } from "@/lib/supabase/queries";
import { allKanbanPosts } from "@/lib/supabase/queriesClient";

import { getProjectNameByString } from "@/lib/utils";
import { Suspense } from "react";

const KanbanPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    const [posts, columns] = await Promise.all([allKanbanPosts(getProjectNameByString(project)), getAllColumns(getProjectNameByString(project))])
    if (columns.error || posts.error) throw new Error('Something went wrong')   
    
    return (
        <EditTicketProvider>
            <DashboardBreadcrumb pageParam={project} currentPage="Kanban" />
            <div className="w-full flex flex-col mt-10 gap-20">
                <Suspense fallback={<LandingSpinner />}>
                    <DashboardKanbanPSP posts={posts.data!}  columns={columns.data!} />
                </Suspense>
            </div>
        </EditTicketProvider>
    )
}
export default KanbanPage;

