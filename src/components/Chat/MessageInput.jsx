import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { database } from "../../BackendServices/AppWrite";
import { ID } from "appwrite";

export default function MessageInput({
  conversation,
  currentUser,
}) {

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      setLoading(true);

      // Find receiver

      const receiverId =
        conversation.participants.find(
          id => id !== currentUser.$id
        );

      // Create Message

      const text = message.trim();

await database.createDocument(
  import.meta.env.VITE_DATABASE,
  import.meta.env.VITE_MESSAGE,
  ID.unique(),
  {
    conversationid: conversation.$id,
    senderid: currentUser.$id,
    receiverid: receiverId,
    message: text,
    type: "text",
    status: "sent",
  }
);

setMessage("");

await database.updateDocument(
  import.meta.env.VITE_DATABASE,
  import.meta.env.VITE_CONVERSATION,
  conversation.$id,
  {
    lastmessage: text,
    lastsender: currentUser.$id,
    lastmessagetime: new Date().toISOString(),
  }
);

    

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      sendMessage();

    }

  };

  return (

    <div className="border-t border-slate-700 bg-[#111827] p-5">

      <div className="flex items-center gap-4">

        <textarea

          rows={1}

          placeholder="Type your message..."

          value={message}

          onChange={(e) =>
            setMessage(e.target.value)
          }

          onKeyDown={handleKeyDown}

          className="flex-1 bg-[#1E293B] text-white placeholder:text-slate-400 rounded-xl px-5 py-3 resize-none outline-none border border-slate-700 focus:border-violet-500"

        />

        <button

          onClick={sendMessage}

          disabled={loading}

          className="w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-500 flex justify-center items-center transition disabled:opacity-50"

        >

          <FaPaperPlane />

        </button>

      </div>

    </div>

  );

}