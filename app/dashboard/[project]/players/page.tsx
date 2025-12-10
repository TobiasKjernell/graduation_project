import Loading from "@/app/loading";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardPlayerTable, { columns } from "@/components/DashboardPlayerTable";
import { fakePlayerTable } from "@/lib/data";

import { Suspense } from "react";

const PlayersPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Players" />

            <div className="w-full flex flex-col lg:px-30">
                <Suspense fallback={<Loading />}>
                    <DashboardPlayerTable columns={columns} data={fakePlayerTable} />
                </Suspense>
            </div>
        </div>
    )
}

export default PlayersPage; 