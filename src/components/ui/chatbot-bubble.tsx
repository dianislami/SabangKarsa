import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import axios from "axios";

type errorRes = {
    message: string,
    status: number
}

export function UserBubble({ message }: { message: string }) {
    return (
        <div className="flex justify-end mb-2">
            <div className="max-w-[80%] bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-sm">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
}

export function BotBubble({ message, token }: { message: string, token: string }) {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const fetchReply = async () => {
            try {
                const res = await axios.post("https://api-jaksabang-chatbot.vercel.app/", 
                    {
                        message,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setResponse(res.data.response);
            } 
            catch (error) {
                const errorObj = error as errorRes;

                console.error(errorObj);

                setResponse(`${errorObj.status}: ${errorObj.message}`);
            }
        };

        fetchReply();
    }, [message, token]);

    return (
        <div className="flex justify-start mb-2">
            <div className="max-w-[80%] bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 rounded-2xl rounded-tl-md shadow-sm">
                {response ? ( 
                    <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                ) : ( 
                    <div className="flex items-center gap-2">
                        <DotLoader size={16} color="#10b981" />
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Mengetik...</span>
                    </div>
                )}
            </div>
        </div>
    );
}