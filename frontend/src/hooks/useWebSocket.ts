//So we need to hook with the websocket right,

//Here we gonna define a structure for Currencies
/*
    basically same as in server using interface
*/

import { useEffect, useState, useRef } from "react";

interface Currency {
    name: string;
    value: string;
    decimal: number;
    interval_ms: number;
}

const useWebSocket = (url: string) =>{
    const [data, setData] = useState<Currency[]>([]); //We need to specify the type here cause ts stuff
    const ws= useRef<WebSocket | null>(null);
    const reconnectionInterval= useRef<number>(1000); //if ws disconnects, it takes 1s to try and reconnect again (shouldnt happen tho)


    const connectWebSocket=()=>{
        ws.current = new WebSocket(url);

        ws.current.onopen=()=>{
            console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setData((prevBatch) => [...prevBatch, response]);
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed. Reconnecting...");
            setTimeout(() => {
                connectWebSocket(); // Reconnect
            }, reconnectionInterval.current);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            ws.current?.close(); // Close WebSocket on error
        };
    };

    useEffect(()=>{

        connectWebSocket(); // when the component is mounted (since begginning) it connects

        return ()=>{
            if(ws.current) {
                ws.current.close(); //close ws when we close the page basically
            }
        }
    }, [url]);

    return data;
}

export default useWebSocket;