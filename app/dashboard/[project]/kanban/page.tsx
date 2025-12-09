import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardKanban from "@/components/DashboardKanban";

const KanbanPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Kanban" />
            <div className="w-full flex flex-col mt-10">
                <DashboardKanban />
            </div>

        </div>
    )
}
export default KanbanPage;