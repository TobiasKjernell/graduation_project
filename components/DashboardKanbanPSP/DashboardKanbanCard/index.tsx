import { KanbanColumns } from "@/lib/supabase/queriesClient"
import { Settings } from "lucide-react"

interface IKanbanCard {
    status: string,
    options: KanbanColumns
}

const DashboardKanbanCard = ({status, options}:IKanbanCard) => {

    return (
        <div className="p-2 border m-2 flex flex-col gap-2 bg-zinc-900 rounded-sm">
                        <div className="flex gap-2">
                            <select defaultValue={status} className="bg-zinc-900 border w-full">
                                {options && options.map(optionValue => <option key={optionValue.name} value={optionValue.name}>{optionValue.name}</option>) }
                            </select>
                            <button className="cursor-pointer">
                                <Settings className="hover:text-zinc-400" />    
                            </button>
                        </div>
                        <h3 className="text-[14px]">Update car with explotion, reset map </h3>
                        <h4 className="text-sm psp-text-gold">Assigned to: Tobias</h4>
                    </div>
    )
}

export default DashboardKanbanCard