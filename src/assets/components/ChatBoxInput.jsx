import './ChatBoxInput.css';
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { post } from './fetcher'



export default function ChatBoxInput({setStreamBuffer, setMessages, messages, setThinking}) {

    const idUser = 1
    const idNPC = 2
    const currentScene = ""
    const playerName = "Gabriel"
    const voiceId = "SOYHLrjzK2X1ezoPC6cr"

    const ref = useRef();

    const [isTyping, setIsTyping] = useState(false);
    const [msg, setMsg] = useState("");
    const sndMsg = useMutation({
        mutationFn: () => {
            return post("npc_interact", {
                "idUser": idUser,
                "idNPC": idNPC,
                "currentScene": currentScene,
                "playerName": playerName,
                "idVoice": voiceId,
                "playerText": "[player responded to you] " + msg,
            });
        },
        onSuccess : ()=>{
            setMsg("");
        }

    });
    
    function handleSendMsg(){
        
        if (!ref.current)return;
        if (ref.current.value === "") return;
        setThinking(true);
        setMsg(ref.current.value);
        setStreamBuffer(prev => prev + ref.current.value + "\n\n");
        setMessages([...messages, {
            "sender" : "human",
            "message" : ref.current.value
        }]);
        sndMsg.mutate();
        ref.current.value = "";
        setStreamBuffer("");
    }

    const buttonClass = isTyping ? "sendChatText highlighted" : "sendChatText";

    return (
        <div className='chatBoxInputRoot'>
            <textarea 
                ref={ref}
                className='chatBoxInput' 
                onKeyDown={e => {
                    if (e.key === 'Enter'){
                        e.preventDefault();
                        handleSendMsg();
                        setIsTyping(false);
                    }
                    setIsTyping(true);
                }}
                placeholder='message...'
                maxLength={1000}
                spellCheck='false'
                onKeyUp={() => {
                    setIsTyping(false);
                }}
                onBlur={()=>setIsTyping(false)}
            />
            <button 
                className={buttonClass}
                aria-label='send chat text'
                onClick={handleSendMsg}
            >
                <Icon icon='streamline:mail-send-email-message'/>
            </button>
        </div>
    );
}