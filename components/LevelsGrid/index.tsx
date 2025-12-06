import { getLevelsByProject } from "@/lib/supabase/queries"
import { projectNameString } from "@/lib/utils";
import LevelGridItem from "../LevelGridItem";


const LevelsGrid = async ({ project }: { project: string }) => {

    const { data, error } = await getLevelsByProject(projectNameString(project))
    if (error) return <div>Something went wrong: {error.message}</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {data && data.map(item => <LevelGridItem key={item.id} {...item} />)}
        </div>
    )
}   

export default LevelsGrid;