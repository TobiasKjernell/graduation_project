import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const PlayersPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Players" />
        </div>
    )
}   

export default PlayersPage;