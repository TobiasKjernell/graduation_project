import { cn } from "@/lib/utils";
import { IKanbanColumn, mockColumns } from "..";
import DashboardKanbanCard from "../DashboardKanbanCard";

const DashboardKanbanColumns = ({ name, color, }: IKanbanColumn) => {
    return (
        <div className="flex-col bg-zinc-800 border border-zinc-700 min-h-30 rounded-xl">
            {/* Header Top Content  */}
            <div className="flex gap-2 items-center p-2 border-b">
                <div className='h-2 w-2 rounded-[50%]' style={{ backgroundColor: color }} />
                <h2 className="text-lg psp-text-jura">{name}</h2>
            </div>
            {/* card */}        
            <DashboardKanbanCard status={name} options={mockColumns} />
        </div>
    )
}

export default DashboardKanbanColumns;