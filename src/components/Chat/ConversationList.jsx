import { useEffect,useRef } from "react";
import {
  account,
  database,
} from "../../BackendServices/AppWrite";
import { ID, Query } from "appwrite";
import ConversationCard from "./ConversationCard";

export default function ConversationList({
  currentUser,
  receiverId,
  conversations,
  setConversations,
  selectedConversation,
  setSelectedConversation,
}) {
const hasOpenedConversation = useRef(false);

  const loadConversations = async () => {

    if (!currentUser) return;

    try {

      const response = await database.listDocuments(
        import.meta.env.VITE_DATABASE,
        import.meta.env.VITE_CONVERSATION,
        [
          Query.contains("participants", currentUser.$id),
          Query.orderDesc("$updatedAt"),
        ]
      );

      setConversations(response.documents);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadConversations();

  }, [currentUser]);

  // Open/Create conversation
useEffect(() => {

    if (!currentUser || !receiverId) return;

    if (hasOpenedConversation.current) return;

    hasOpenedConversation.current = true;

    const openConversation = async () => {
        try {
            const response = await database.listDocuments(
                import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_CONVERSATION,
                [
                  Query.contains("participants", currentUser.$id),
                  Query.contains("participants", receiverId),
                ]
            );

            if (response.documents.length > 0) {

                setSelectedConversation(response.documents[0]);
                return;

            }

            const conversation = await database.createDocument(
                import.meta.env.VITE_DATABASE,
                import.meta.env.VITE_CONVERSATION,
                ID.unique(),
                {
                    participants: [
                        currentUser.$id,
                        receiverId,
                    ],
                    lastmessage: "",
                    lastsender: "",
                    lastmessagetime: new Date().toISOString(),
                }  
            );

            setSelectedConversation(conversation);

            loadConversations();

        } catch (error) {

            console.log(error);

        }

    };

    openConversation();

}, [currentUser, receiverId]);

  return (

    <div className="h-full bg-[#111827]">

      <div className="p-6 border-b border-slate-700">

        <h2 className="text-2xl font-bold text-white">

          Messages

        </h2>

        <p className="text-slate-400 text-sm mt-1">

          Your conversations

        </p>

      </div>

      <div className="overflow-y-auto h-[calc(100%-82px)]">

        {

          conversations.length === 0 ?

          <div className="text-center mt-10 text-slate-500">

            No Conversations

          </div>

          :

          conversations.map((conversation) => (

            <ConversationCard

              key={conversation.$id}
              conversation={conversation}

              currentUser={currentUser}

              selectedConversation={selectedConversation}

              setSelectedConversation={setSelectedConversation}

            />

          ))

        }

      </div>

    </div>

  );

}