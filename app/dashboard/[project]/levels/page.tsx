import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const LevelsPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Levels" />
        </div>
    )
}

export default LevelsPage;