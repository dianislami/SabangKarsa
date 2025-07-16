import { Send, Bot } from "lucide-react"
import React, { useRef, useState, forwardRef, useEffect, type RefObject } from "react"
import { BotBubble, UserBubble } from "./chatbot-bubble";

export const ChatbotOverlay = forwardRef<HTMLDivElement, { showOverlay: boolean, navbar: RefObject<HTMLElement | null>, button: RefObject<HTMLButtonElement | null> }>(({ showOverlay, navbar, button }, ref) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const outputRef = useRef<HTMLDivElement | null>(null);
    const [overlayHeight, setOverlayHeight] = useState<number>(0);
    const [overlayWidth, setOverlayWidth] = useState<number>(580);
    const [elements, setElements] = useState<React.ReactNode[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    let token = localStorage.getItem("token")|| "";

    const callbot = () => {
        const inputValue = inputRef.current?.value.trim();
        
        if (inputValue) {
            setElements(prev => [...prev, <UserBubble key={`user-${prev.length}`} message={inputValue} />]);
            setElements(prev => [...prev, <BotBubble key={`bot-${prev.length}`} message={inputValue} token={token} />]);
            
            // Clear input after sending
            if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.style.height = 'auto';
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            callbot();
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    useEffect(() => {
        const el = outputRef.current;

        if (el) el.scrollTop = el.scrollHeight;
    }, [elements]);

    useEffect(() => {
        const updateOverlayHeight = () => {
            const navbarHeight = navbar.current?.clientHeight;
            const windowHeight = window.innerHeight;
            const buttonEl = button.current;
            const buttonRect = buttonEl?.getBoundingClientRect();
        
            if (buttonRect && navbarHeight) {
                const buttonPosY = window.innerHeight - buttonRect.bottom;
                const buttonStyle = window.getComputedStyle(buttonEl as Element);
                const buttonPT = Number(buttonStyle.getPropertyValue("padding-top").replace("px", ""));
                const height = windowHeight - navbarHeight - buttonRect.height - buttonPosY - (buttonPT * 2);
        
                setOverlayHeight(height);
            }
        }

        updateOverlayHeight();

        window.addEventListener("resize", updateOverlayHeight);

        return () => window.removeEventListener("resize", updateOverlayHeight);
    }, [navbar, button]);

    useEffect(() => {
        const overlayRef = ref as RefObject<HTMLDivElement>;

        const updateOverlayWidth = () => {
            const currentWidth = window.innerWidth;
            
            setWindowWidth(currentWidth);

            if (windowWidth < 640) {
                const overlayPadX = Number(window.getComputedStyle(overlayRef.current).getPropertyValue("right").replace("px", ""));
                const overlayCurrentWidth = Math.abs(windowWidth - overlayPadX);
                const newOverlayWidth = Math.abs(windowWidth - (overlayCurrentWidth * 2));

                setOverlayWidth(newOverlayWidth);

                console.log(`padX: ${overlayPadX}; OCurW: ${overlayCurrentWidth}; WinW: ${windowWidth}; width: ${newOverlayWidth}`);
            }
            else {
                setOverlayWidth(580);
            }
        }

        updateOverlayWidth();

        window.addEventListener("resize", updateOverlayWidth);

        return () => window.removeEventListener("resize", updateOverlayWidth);
    }, [ref, windowWidth])

    return (
        <div ref={ref} className={`bg-white dark:bg-gray-800 overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 fixed right-6 bottom-26 z-10 transition-all duration-500 ease-in-out ${showOverlay ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`} style={{ height: `${overlayHeight}px`, width: `${overlayWidth}px` }}>
            <div className="flex flex-col w-full h-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 p-4 rounded-t-2xl">
                    <h1 className="font-bold text-lg text-white flex items-center gap-2">
                        <Bot className="w-6 h-6" />
                        JakSabang AI Assistant
                    </h1>
                    <p className="text-emerald-100 text-sm mt-1">Siap membantu Anda!</p>
                </div>
                
                {/* Chat Area */}
                <div ref={outputRef} className="flex flex-col gap-3 w-full overflow-y-auto scroll-smooth grow p-4 bg-gray-50 dark:bg-gray-900">
                    {elements.length !== 0 ? elements.map((el, index) => ( 
                        <div key={index}>{el}</div> 
                    )) : ( 
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
                                <Bot className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Halo!</p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Ada yang bisa saya bantu?</p>
                        </div> 
                    )}
                </div>
                
                {/* Input Area */}
                <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-end gap-3">
                        <div className="flex-1 relative">
                            <textarea 
                                ref={inputRef} 
                                onKeyDown={handleKeyDown}
                                onChange={handleInputChange}
                                className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-400 dark:focus:border-emerald-500 focus:outline-none p-3 resize-none rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 min-h-[44px]" 
                                placeholder="Ketik pesan Anda... (Enter untuk kirim)" 
                                rows={1}
                            />
                            <div className="absolute bottom-5 right-8 text-xs text-gray-400">
                                Enter ↵
                            </div>
                        </div>
                        <button 
                            onClick={callbot} 
                            className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white p-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
})