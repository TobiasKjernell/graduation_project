import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardKanbanPSP from "@/components/DashboardKanbanPSP";
import { allKanbanPosts, getAllColumns } from "@/lib/supabase/queriesClient";

const KanbanPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    const {data:posts, error} = await allKanbanPosts();
    const {data:columns, error:errorColumns} = await getAllColumns();
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Kanban" />
            <div className="w-full flex flex-col mt-10 gap-20">
                <DashboardKanbanPSP posts={posts!} columns={columns!} />
            </div>

        </div>
    )
}
export default KanbanPage;