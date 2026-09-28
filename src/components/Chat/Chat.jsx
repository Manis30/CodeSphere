import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ConversationList from "./ConversationList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyChat from "./EmptyChat";
import { account } from "../../BackendServices/AppWrite";
import Loading from "../Loader";
export default function Chat() {
    const [loader,setLoader]=useState(true)
    const { id: receiverId } = useParams();

    const [currentUser, setCurrentUser] = useState(null);

    const [conversations, setConversations] = useState([]);

    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {

        const initializeChat = async () => {

            try {

                const user = await account.get();

                setCurrentUser(user);
                setLoader(false)

            }

            catch (error) {

                console.log(error);

            }

        };

        initializeChat();

    }, []);
      if(loader)
    return <Loading/>
    return (

        <div className="h-full flex bg-[#0F172A] overflow-hidden">

            <div className="w-[340px] border-r border-slate-700">

                <ConversationList
    currentUser={currentUser}
    receiverId={receiverId}
    conversations={conversations}
    setConversations={setConversations}
    selectedConversation={selectedConversation}
    setSelectedConversation={setSelectedConversation}
/>

            </div>

            <div className="flex-1 flex flex-col">

                {

                    selectedConversation ?

                    <>

                        <ChatHeader
    conversation={selectedConversation}
    currentUser={currentUser}
/>

                        <MessageList

                            conversation={selectedConversation}

                            currentUser={currentUser}

                        />

                        <MessageInput

                            conversation={selectedConversation}

                            currentUser={currentUser}

                        />

                    </>

                    :

                    <EmptyChat />

                }

            </div>

        </div>

    );

}