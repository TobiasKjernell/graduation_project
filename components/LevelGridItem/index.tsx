'use client'

import { UpdateLevel } from "@/actions/update-level";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

const LevelGridItem = ({ name, status, id, project_id }: { name: string, status: boolean, id: number, project_id: number }) => {

    const { mutate, isPending, error } = useMutation({
        mutationFn: UpdateLevel
    })

    return (
        <Card key={name}>
            <CardContent className="flex justify-between items-center">
                <CardTitle>{name}</CardTitle>
                {error && <div className='text-red-500'>{error.message}</div>}
                <div className="flex items-center gap-2 ">
                    {isPending ? <Badge variant='outline'>Pending</Badge> : <Badge variant='secondary' className={cn(status ? 'bg-green-500'
                        : 'bg-red-500')}>{status ? 'Online' : 'Offline'}</Badge>}
                    <Switch defaultChecked={status} onCheckedChange={(e) => mutate({ id, updateInfo: { status: e.valueOf() }, project_id: project_id  })} />
                </div>
            </CardContent>
        </Card>
    )   
}

export default LevelGridItem;
