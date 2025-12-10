import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardKanbanPSP from "@/components/DashboardKanbanPSP";

const KanbanPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Kanban" />
            <div className="w-full flex flex-col mt-10 gap-20">
                <DashboardKanbanPSP />
            </div>

        </div>
    )
}
export default KanbanPage;