export interface IProject {
    name: string,
    nameUrl: string,
    leaderboardUrl: string,
    playersUrl: string,
    settingsUrl: string,
    levelsUrl: string,  
    kanbanUrl: string,
    gantUrl: string
}

export const projects: IProject[] = [{
    name: 'Slot Car Racing (VR)',
    nameUrl: "/dashboard/slotcarracing",
    leaderboardUrl: "/dashboard/slotcarracing/leaderboard",
    playersUrl: "/dashboard/slotcarracing/players",
    settingsUrl: "/dashboard/slotcarracing/settings",
    levelsUrl: "/dashboard/slotcarracing/levels",
    kanbanUrl: "/dashboard/slotcarracing/kanban",
    gantUrl: "/dashboard/slotcarracing/gant"
},
{
    name: 'Number Ops',
    nameUrl: "/dashboard/numberops",
    leaderboardUrl: "/dashboard/numberops/leaderboard",
    playersUrl: "/dashboard/numberops/players",
    settingsUrl: "/dashboard/numberops/settings",
    levelsUrl: "/dashboard/numberops/levels",
    kanbanUrl: "/dashboard/numberops/kanban",
    gantUrl: "/dashboard/numberops/gant"    
}]