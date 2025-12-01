import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const KanbanPage = async({params}:{params:Promise<{project:string}>}) => {
    const {project} = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Kanban" />
        </div>
    )
}
export default KanbanPage;