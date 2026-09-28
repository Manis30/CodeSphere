import { useEffect, useState } from "react";
import { database, storage } from "../../BackendServices/AppWrite";
import { formatDistanceToNow } from "date-fns";
import profileimg from '../../assets/profileimg.jpeg'
export default function ConversationCard({
  conversation,
  currentUser,
  selectedConversation,
  setSelectedConversation,
}) {
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchReceiver = async () => {
      try {
        // Find the other participant
        const receiverId = conversation.participants.find(
          (id) => id !== currentUser.$id
        );

        // Get receiver profile
        const user = await database.getDocument(
          import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_USER,
          receiverId
        );

        let profileImagePreview = "";

        if (user.profileimage) {
          profileImagePreview = await storage.getFileView(
            import.meta.env.VITE_BUCKET_PROFILE_IMAGE,
            user.profileimage
          );
        }

        setReceiver({
          ...user,
          profileImagePreview,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchReceiver();
  }, [conversation, currentUser]);

  if (!receiver) {
    return (
      <div className="px-5 py-4 animate-pulse border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-700"></div>

          <div className="flex-1">
            <div className="w-32 h-4 rounded bg-slate-700"></div>

            <div className="w-20 h-3 rounded bg-slate-800 mt-3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setSelectedConversation(conversation)}
      className={`w-full px-5 py-4 flex items-center gap-4 transition-all duration-300 cursor-pointer border-b border-slate-800

      ${
        selectedConversation?.$id === conversation.$id
          ? "bg-violet-600/15 border-r-4 border-violet-500"
          : "hover:bg-slate-800/80"
      }`}
    >
      {/* Profile */}

      <div className="relative flex-shrink-0">
        <img
          src={
            receiver.profileImagePreview ||
            profileimg
          }
          alt=""
          className="w-14 h-14 rounded-full object-cover"
        />

        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#111827]

          ${
            receiver.isonline
              ? "bg-green-500"
              : "bg-slate-500"
          }`}
        ></span>
      </div>

      {/* Content */}

      <div className="flex-1 overflow-hidden text-left">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold truncate">
            {receiver.name}
          </h3>

          {conversation.lastmessagetime && (
            <span className="text-[11px] text-slate-500">
              {formatDistanceToNow(
                new Date(conversation.lastmessagetime),
                {
                  addSuffix: true,
                }
              )}
            </span>
          )}
        </div>

        <p className="text-sm text-slate-400 truncate mt-1">
          {conversation.lastmessage || "Start chatting..."}
        </p>
      </div>
    </button>
  );
}