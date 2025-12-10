'use client'
import { SingleKanbanPost } from "@/lib/supabase/queriesClient";
import { createContext, useContext, useState } from "react";

interface IEditContext {
    toggleEditing: () => void,
    isEditing: boolean;
    currentTicket: SingleKanbanPost | null,
    handleSetTicket: (item: SingleKanbanPost | null) => void
}

const EditTicketContext = createContext<IEditContext | null>(null);

const EditTicketProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false); 
    const [currentTicket, setCurrentTicker] = useState<SingleKanbanPost | null>(null);
    const toggleEditing = () => setIsEditing(e => !e);
    const handleSetTicket = (item:SingleKanbanPost | null) => setCurrentTicker(item);

    return <EditTicketContext.Provider value={{ isEditing, toggleEditing, currentTicket, handleSetTicket }}>
        {children}
    </EditTicketContext.Provider>
}

const useTicketEdit = () => {
    const context:IEditContext | null = useContext(EditTicketContext);
    if (context === undefined) throw new Error('edit ticket context was used outside provider')
    return context as IEditContext;
}

export { EditTicketProvider, useTicketEdit };
