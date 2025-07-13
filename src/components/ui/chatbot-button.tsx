import { MessageCircle } from "lucide-react"
import { ChatbotOverlay } from "./chatbot-overlay"
import { useState, useRef, useEffect } from "react"

export function ChatbotButton() {
    const [visibility, setVisibility] = useState(false);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const visibilityToggle = () => setVisibility(prev => !prev);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) setVisibility(false);
        }

        if (visibility) document.addEventListener("mousedown", handleClickOutside);
        else document.removeEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [visibility]);

    return (
        <>
            <ChatbotOverlay showOverlay={visibility} ref={overlayRef} />
            
            <button ref={buttonRef} onClick={visibilityToggle} className="bg-(--background) z-10 shadow-sm hover:-translate-y-2 transition-transform duration-300 ease-out cursor-pointer fixed right-8 bottom-8 p-[12px] rounded-full">
                <MessageCircle className="stroke-emerald-600" />
            </button>
        </>
    );
}