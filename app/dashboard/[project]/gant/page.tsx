import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const GantPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Gant"/>
        </div>
    )
}

export default GantPage;