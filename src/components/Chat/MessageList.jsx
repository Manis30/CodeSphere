import { useEffect, useRef, useState } from "react";
import { database,client } from "../../BackendServices/AppWrite";
import { Query } from "appwrite";
import MessageBubble from "./MessageBubble";

export default function MessageList({
  conversation,
  currentUser,
}) {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
const messageContainerRef = useRef(null);

useEffect(() => {

  if (!conversation) return;

  const fetchMessages = async () => {

    try {

      setLoading(true);

      const res = await database.listDocuments(
        import.meta.env.VITE_DATABASE,
        import.meta.env.VITE_MESSAGE,
        [
          Query.equal("conversationid", conversation.$id),
          Query.orderAsc("$createdAt"),
        ]
      );

      setMessages(res.documents);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  fetchMessages();

}, [conversation?.$id]);
useEffect(() => {

  setTimeout(() => {

    if (messageContainerRef.current) {

      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;

    }

  }, 50);

}, [messages]);
  useEffect(() => {

  if (!conversation) return;

  const unsubscribe = client.subscribe(

    `databases.${import.meta.env.VITE_DATABASE}.tables.${import.meta.env.VITE_MESSAGE}.rows`,

    async (response) => {

      console.log("Realtime Fired:", response.payload);

      if (response.payload.conversationid !== conversation.$id)
        return;

      try {

        const res = await database.listDocuments(

          import.meta.env.VITE_DATABASE,

          import.meta.env.VITE_MESSAGE,

          [
            Query.equal("conversationid", conversation.$id),
            Query.orderAsc("$createdAt"),
          ]

        );

        setMessages(res.documents);

      } catch (err) {

        console.log(err);

      }

    }

  );

  return () => unsubscribe();

}, [conversation?.$id]);

  if (loading) {

    return (

      <div className="flex-1 flex justify-center items-center text-slate-400">

        Loading messages...

      </div>

    );

  }

  return (

 <div
  ref={messageContainerRef}
  className="flex-1 overflow-y-auto px-6 py-5 bg-[#0F172A]"
>

      {

        messages.length === 0 ?

        (

          <div className="flex h-full justify-center items-center text-slate-500">

            Start your conversation 👋

          </div>

        )

        :

        messages.map((message) => (

          <MessageBubble

            key={message.$id}

            message={message}

            isMine={

              message.senderid === currentUser.$id

            }

          />

        ))

      }


    </div>

  );

}