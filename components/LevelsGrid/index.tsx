import { getLevelsByProject } from "@/lib/supabase/queries"
import { getProjectNameByString } from "@/lib/utils";
import LevelGridItem from "../LevelGridItem";
import { cacheLife } from "next/cache";

const LevelsGrid = async ({ project }: { project: string }) => {
   'use cache'
   cacheLife('default')
    const { data, error } = await getLevelsByProject(getProjectNameByString(project))
    if (error) return <div>Something went wrong: {error.message}</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {data && data.map(item => <LevelGridItem key={item.id} {...item} project_id={getProjectNameByString(project)} />)}
        </div>
    )
}
        
export default LevelsGrid;