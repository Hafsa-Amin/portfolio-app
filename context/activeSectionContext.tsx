"use client"
import React, { useState, createContext, useContext } from "react";
import { SectionName } from "@/lib/types";

type ActiveSectionContextProviderProps = {
    children: React.ReactNode;
}
type ActiveActionType = {
    activeSection: SectionName,
    setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
    timeOfLastClick: number,
    setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>
}

export const ActiveSectionContext = createContext<ActiveActionType | null>(null);

export default function ActiveSectionContextProvider({
    children
}: ActiveSectionContextProviderProps) {
    const [activeSection, setActiveSection] = useState<SectionName>("Home");
    const [timeOfLastClick, setTimeOfLastClick] = useState(0);
    return <ActiveSectionContext.Provider
        value = {{
             activeSection,
             setActiveSection,
             timeOfLastClick,
             setTimeOfLastClick
            }}
    >{children}</ActiveSectionContext.Provider>;
}

export function useActiveSectionContext() {
    const context = useContext(ActiveSectionContext);
    if (context === null) {
        throw new Error("useActiveSectionContext must be used within an ActiveSectionContextProvider");
    }
    return context;
}