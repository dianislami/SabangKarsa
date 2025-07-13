import { Send } from "lucide-react"
import React, { useRef, useState, forwardRef, useEffect } from "react"
import { BotBubble, UserBubble } from "./chatbot-bubble";

export const ChatbotOverlay = forwardRef<HTMLDivElement, { showOverlay: boolean }>(({ showOverlay }, ref) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const outputRef = useRef<HTMLDivElement | null>(null);
    const [elements, setElements] = useState<React.ReactNode[]>([]);

    const callbot = () => {
        const inputValue = inputRef.current?.value.trim();
        
        if (inputValue) {
            setElements(prev => [...prev, <UserBubble key={`user-${prev.length}`} message={inputValue} />]);
            setElements(prev => [...prev, <BotBubble key={`bot-${prev.length}`} message={inputValue} token={``} />]);  // FIXME: isi token disini
        }
    }

    useEffect(() => {
        const el = outputRef.current;

        if (el) el.scrollTop = el.scrollHeight;
    }, [elements]);

    return (
        <div ref={ref} className={`bg-(--background) overflow-hidden h-164 w-[80vw] lg:w-132 rounded-3xl shadow-md fixed right-6 bottom-26 z-10 transition-[transform opacity] duration-500 ease-in-out ${showOverlay ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="flex flex-col w-full h-full p-6 gap-4">
                <h1 className="font-semibold text-xl py-1">CHATBOT AI</h1>
                <div ref={outputRef} className="flex flex-col gap-4 w-full overflow-y-auto scroll-smooth grow">
                    {elements.length !== 0 ? elements.map((el, index) => ( 
                        <div key={index}>{el}</div> 
                    )) : ( 
                        <div className="h-full flex items-center justify-center text-center text-lg text-gray-400">
                            Halo, <br/> ada yang bisa saya bantu?
                        </div> 
                    )}
                </div>
                <div className="flex flex-row items-center justify-center gap-4 w-full h-32">
                    <textarea ref={inputRef} className="bg-(--chatbot) border-2 p-4 resize-none outline-none border-emerald-400 h-full w-full rounded-xl" placeholder="Tanyakan sesuatu" />
                    <div onClick={callbot} className="group bg-gray-200 hover:bg-emerald-100 ease-out duration-200 cursor-pointer p-4 flex items-center justify-center rounded-full">
                        <Send className="stroke-gray-600 group-hover:stroke-emerald-600 ease-out duration-200 translate-x-[-2px] translate-y-[1px]" />
                    </div>
                </div>
            </div>string
        </div>
    );
})