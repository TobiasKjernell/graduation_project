import Loading from "@/app/loading";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import LeaderboardTable, { columns } from "@/components/LeaderboardTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { fakeLeaderboard } from "@/lib/data";
import { Suspense } from "react";

const LeaderboardPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;

    return (
        <div className="">
            <DashboardBreadcrumb pageParam={project} currentPage="Leaderboard" />

            <div className="w-full flex flex-col lg:px-30">
                <div className="py-2 ml-auto">
                    <Select defaultValue="level1">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="level1">Level 1</SelectItem>
                            <SelectItem value="level2">Level 2</SelectItem>
                            <SelectItem value="level3">Level 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Suspense fallback={<Loading/>}>        
                    <LeaderboardTable columns={columns} data={fakeLeaderboard} />
                </Suspense>
            </div>
        </div>
    )
}

export default LeaderboardPage;