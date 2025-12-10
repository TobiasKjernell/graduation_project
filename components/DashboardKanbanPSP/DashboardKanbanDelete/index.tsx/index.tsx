'use client'
import { DeleteTicket } from "@/actions/deleteKanbanPost";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { useTicketEdit } from "../../context/useTicketContext";

const DashboardKanbanDelete = () => {
    const { currentTicket, toggleEditing, handleSetTicket } = useTicketEdit();
    const { mutate, isPending } = useMutation(
        {
            mutationFn: DeleteTicket,
            onSuccess: () => { handleSetTicket(null); toggleEditing(); }
        },
    );

    return (
        <button onClick={(e) => { e.preventDefault(); mutate(currentTicket!.id) }} className="cursor-pointer text-red-500">{isPending ? <Spinner /> : 'Delete'}</button>
    )
}
export default DashboardKanbanDelete;