import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardKanbanPSP from "@/components/DashboardKanbanPSP";
import LandingSpinner from "@/components/LandingSpinner";
import { allKanbanPosts, getAllColumns } from "@/lib/supabase/queriesClient";
import { Suspense } from "react";

const KanbanPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    const [posts, columns] = await Promise.all([allKanbanPosts(), getAllColumns()])
    if(posts.error || columns.error) throw new Error('Something went wrong')

    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Kanban" />
            <div className="w-full flex flex-col mt-10 gap-20">
                <Suspense fallback={<LandingSpinner />}>
                    <DashboardKanbanPSP posts={posts.data!} columns={columns.data!} />
                </Suspense>
            </div>

        </div>
    )
}
export default KanbanPage;