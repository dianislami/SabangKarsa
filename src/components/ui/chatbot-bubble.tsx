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
        <div className="flex flex-col gap-2 bg-emerald-600 text-white ml-25 p-4 rounded-xl">
            {message}
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
        <div className="flex flex-col gap-2 mr-25 p-4 rounded-lg">
            {response ? ( 
                <ReactMarkdown>{response}</ReactMarkdown> 
            ) : ( 
                <DotLoader size={24} color="#00d492" /> 
            )}
        </div>
    );
}