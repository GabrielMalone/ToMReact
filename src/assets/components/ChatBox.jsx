import './ChatBox.css'
import { Avatar } from './Avatar';
import ChatBoxInput from './ChatBoxInput';
import { socket } from '../../socket'
import { useEffect, useState, useRef } from 'react';


export default function ChatBox(){

    const [streamBuffer, setStreamBuffer] = useState("");
    const [messages, setMessages] = useState([]);
    const [thinking, setThinking] = useState(false);
    const mainChatRef = useRef();

    useEffect(()=>{

        function tokenHandle(data){
            setThinking(false);
            setStreamBuffer(prev => prev + data.token);
        }

        function handleDone(){

            setMessages(prev => [
                ...prev,
                { sender:"NPC", message: streamBuffer }
            ]);

            setStreamBuffer("");
        }

        socket.on("npc_text_token", tokenHandle);
        socket.on("npc_text_done", handleDone);

        return () => {
            socket.off("npc_text_token", tokenHandle);
            socket.off("npc_text_done", handleDone);
        };
            
    },[messages, streamBuffer]);

    useEffect(() => {
        const el = mainChatRef.current;
        if (!el) return;
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 100);
    }, [streamBuffer, setStreamBuffer, thinking]);

    return (
        <div className='chatBoxRoot'>
            
            <div className='chatBoxHeader'> 
                
                <div className='avatarsInHeader'>
                        <Avatar size={96}/>
                        <Avatar size={96}/>
                    <div className='namesInHeader'>
                        <div className='name1'>
                            Gabriel
                        </div>
                        <div className='name2'>
                            NPC
                        </div>
                    </div>
                </div>

            <div 
                ref={mainChatRef}
                className='chatWindowRoot'
            >
                <div className='messages'>

                    {messages?.map((msg, i) =>{

                        return(
                        <div className='messageRoot'>
                            <div 
                            className='txtAvatar'
                            style={msg.sender === "NPC" ? 
                                { justifyContent: "flex-start" } 
                                : undefined}
                            >
                            {msg.sender === "NPC"
                                ? 
                                <Avatar size={24}/> 
                                : 
                                <Avatar size={24}/>
                            }
                            </div>
                            <div 
                                key={i} 
                                className={msg.sender === "NPC" ? 
                                    "npcMessage" : 
                                    "humanMessage"
                                }
                            >
                                {msg.message}
                            </div>
                        </div>
                        );

                    })}
                    <div className='npcMessage'>
                        { streamBuffer }
                    </div>
                    <div className={`thinking ${thinking ? "show" : ""}`}>
                        Thinking...
                    </div>
                </div>
            </div>

                <ChatBoxInput 
                    setStreamBuffer={setStreamBuffer}
                    setMessages={setMessages} 
                    messages={messages}
                    setThinking={setThinking}
                />

            </div>
        </div>
    );
}