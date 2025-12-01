import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const SettingsPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Settings" />
        </div>
    )
}

export default SettingsPage; 