import { Send } from "lucide-react"
import React, { useRef, useState, forwardRef, useEffect, type RefObject } from "react"
import { BotBubble, UserBubble } from "./chatbot-bubble";

export const ChatbotOverlay = forwardRef<HTMLDivElement, { showOverlay: boolean, navbar: RefObject<HTMLElement | null>, button: RefObject<HTMLButtonElement | null> }>(({ showOverlay, navbar, button }, ref) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const outputRef = useRef<HTMLDivElement | null>(null);
    const [overlayHeight, setOverlayHeight] = useState<number>(0);
    const [overlayWidth, setOverlayWidth] = useState<number>(580);
    const [elements, setElements] = useState<React.ReactNode[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        <div ref={ref} className={`bg-(--background) overflow-hidden rounded-3xl shadow-md fixed right-6 bottom-26 z-10 transition-all duration-500 ease-in-out ${showOverlay ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`} style={{ height: `${overlayHeight}px`, width: `${overlayWidth}px` }}>
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
            </div>
        </div>
    );
})