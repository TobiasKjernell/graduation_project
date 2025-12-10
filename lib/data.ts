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

export interface IFakeLeaderboard {
    name: string,
    score: string,
    time: string,
    avatar: string
}

export interface IFakePlayerTable {
    name: string,
    id: string,
    avatar: string
    bannedStatus: boolean
}


export const fakeLeaderboard: IFakeLeaderboard[] = [
    { "name": "Thuderking", "score": "9820", "time": "12:03", "avatar": "https://avatars.githubusercontent.com/u/3818" },
    { "name": "ShadowFox", "score": "7540", "time": "14:22", "avatar": "https://avatars.githubusercontent.com/u/381" },
    { "name": "NovaStar", "score": "8890", "time": "09:15", "avatar": "https://avatars.githubusercontent.com/u/382" },
    { "name": "IronClad", "score": "6400", "time": "18:47", "avatar": "https://avatars.githubusercontent.com/u/381" },
    { "name": "CrystalMage", "score": "7310", "time": "21:10", "avatar": "https://avatars.githubusercontent.com/u/380" },
    { "name": "RapidViper", "score": "9100", "time": "07:54", "avatar": "https://avatars.githubusercontent.com/u/233" },
    { "name": "StarBreaker", "score": "8040", "time": "11:33", "avatar": "https://avatars.githubusercontent.com/u/38" },
    { "name": "NightWolf", "score": "6950", "time": "13:28", "avatar": "https://avatars.githubusercontent.com/u/40" },
    { "name": "FireStrike", "score": "8730", "time": "16:05", "avatar": "https://avatars.githubusercontent.com/u/401" },
    { "name": "BlueComet", "score": "9200", "time": "08:42", "avatar": "https://avatars.githubusercontent.com/u/38" },
    { "name": "GhostRider", "score": "7100", "time": "19:55", "avatar": "https://avatars.githubusercontent.com/u/42" },
    { "name": "ThunderWing", "score": "8650", "time": "10:11", "avatar": "https://avatars.githubusercontent.com/u/41" },
    { "name": "LunarKnight", "score": "7990", "time": "17:20", "avatar": "https://avatars.githubusercontent.com/u/34" },
    { "name": "BladeMaster", "score": "9400", "time": "06:37", "avatar": "https://avatars.githubusercontent.com/u/51" },
    { "name": "MysticDawn", "score": "6780", "time": "22:14", "avatar": "https://avatars.githubusercontent.com/u/61" }
]

export const fakePlayerTable: IFakePlayerTable[] = [
    { "name": "Thuderking", "id": "1", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/3818" },
    { "name": "ShadowFox", "id": "2", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/381" },
    { "name": "NovaStar", "id": "3", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/382" },
    { "name": "IronClad", "id": "4", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/381" },
    { "name": "CrystalMage", "id": "5", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/380" },
    { "name": "RapidViper", "id": "6", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/233" },
    { "name": "StarBreaker", "id": "7", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/38" },
    { "name": "NightWolf", "id": "8", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/40" },
    { "name": "FireStrike", "id": "9", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/401" },
    { "name": "BlueComet", "id": "10", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/38" },
    { "name": "GhostRider", "id": "11", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/42" },
    { "name": "ThunderWing", "id": "12", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/41" },
    { "name": "LunarKnight", "id": "13", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/34" },
    { "name": "BladeMaster", "id": "14", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/51" },
    { "name": "MysticDawn", "id": "15", "bannedStatus": false, "avatar": "https://avatars.githubusercontent.com/u/61" }
]



