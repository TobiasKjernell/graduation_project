'use client'

import { DeleteTicket } from "@/actions/deleteKanbanPost";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { useTicketEdit } from "../../context/useTicketContext";
import { idProject } from "@/actions/editKanbanPost";

const DashboardKanbanDelete = () => {
    const { currentTicket, toggleEditing, handleSetTicket } = useTicketEdit();
    const { mutate, isPending, error } = useMutation(
        {
            mutationFn: DeleteTicket,
            onSuccess: () => { handleSetTicket(null); toggleEditing(); }
        },
    );

    return (
        <>
            {error ? <span className="text-red-500 text-xl font-semibold">Cannot delete, server issues</span>
                : <button disabled={isPending} onClick={(e) => {
                    e.preventDefault(); mutate(
                        {
                            ticketId: currentTicket!.id,
                            projectId: currentTicket?.project_id as idProject
                        })
                }}
                    className="cursor-pointer text-red-500 font-semibold text-xl">
                    {isPending ? <Spinner /> : 'Delete'}
                </button>
            }
        </>
    )
}
export default DashboardKanbanDelete;