import DashboardKanbanColumns from "./DashboardKanbanColumn";

export interface IKanbanColumn {
    name: string,
    color: string,
}

export const mockColumns:IKanbanColumn[] =  [
    {
        name: 'Planned',
        color: '#blue'
    },
    {
        name: 'In progress',
        color: '#limegreen'
    },
    {
        name: 'Ready to test',
        color: '#yellow'
    },
    {
        name: 'Testing',
        color: '#orange'
    },
    {
        name: 'Testing failed',
        color: '#red'
    },
    {
        name: 'Testing succeed',
        color: '#green'
    },
    {
        name: 'Done',
        color: '#purple'
    }
] 

const DashboardKanbanPSP = async() => {

    return (
        <div className="flex w-full text-white psp-text-jura">
            <div className="grid grid-cols-7 grid-rows-1 w-full gap-5">
                {mockColumns.map(item => <DashboardKanbanColumns key={item.name} {...item} />)}
            </div>

        </div>
    )
}

export default DashboardKanbanPSP;  