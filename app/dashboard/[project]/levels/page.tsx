import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ILevels {
    name: string,
    status: boolean,
}
const levels: ILevels[] = [
    {
        name: 'Pirate Bay',
        status: true,
    },
    {
        name: 'Sahara',
        status: true,
    },
    {
        name: 'Ice Mountains',
        status: true,
    },
    {
        name: "Dragon's Lair",
        status: false,
    },
    {
        name: 'Goblin Fortress',
        status: true,
    },


]

const LevelsPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const { project } = await params;
    return (
        <div>
            <DashboardBreadcrumb pageParam={project} currentPage="Levels" />
            <h2 className="text-2xl font-semibold">Levels</h2>
            <div className="flex flex-col gap-4 mt-4">
                {levels && levels.map(item => <Card key={item.name}>
                    <CardContent className="flex justify-between items-center">
                        <CardTitle>{item.name}</CardTitle>
                        <div className="flex items-center gap-2 ">
                            <Badge variant='secondary' className={cn(item.status ? 'bg-green-500' : 'bg-red-500')}>{item.status ? 'Online' : 'Offline'}</Badge>
                            <Switch defaultChecked={item.status} />
                        </div>
                    </CardContent>
                </Card>)}

            </div>
        </div>
    )
}

export default LevelsPage;