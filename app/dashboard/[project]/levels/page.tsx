import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import LandingSpinner from "@/components/LandingSpinner";
import LevelsGrid from "@/components/LevelsGrid";
import { Suspense } from "react";

const LevelsPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Levels" />
            <h2 className="text-2xl font-semibold">Levels</h2>

            <Suspense >
                <LevelsGrid project={project} />        
            </Suspense>

        </div>
    )
}

export default LevelsPage;