"use client"
import { useActiveSectionContext } from "@/context/active-section-context";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { SectionName } from "./types";

export function useSectionInView ( sectionName: SectionName, threshold = 0.75) {
    const { ref, inView } = useInView({
        threshold,
    });
    const {setActiveSection, timeOfLastClick } = useActiveSectionContext();
    useEffect(() => {
        if(inView && Date.now() - timeOfLastClick > 1000) { 
            setActiveSection(sectionName);
            const newURL = `${location.origin}/#${sectionName.toLowerCase()}`;
            history.pushState(null, '', newURL);
        }
    }, [inView, setActiveSection, timeOfLastClick, sectionName])
    return { ref, inView };
}