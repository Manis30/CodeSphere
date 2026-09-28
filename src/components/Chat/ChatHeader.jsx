import {
  FaPhoneAlt,
  FaVideo,
  FaEllipsisV,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { database, storage } from "../../BackendServices/AppWrite";
import { formatDistanceToNow } from "date-fns";
import profileimg from '../../assets/profileimg.jpeg'
export default function ChatHeader({
  conversation,
  currentUser,
}) {

  const [receiver, setReceiver] = useState(null);

  useEffect(() => {

    if (!conversation || !currentUser) return;

    const fetchReceiver = async () => {

      try {

        const receiverId = conversation.participants.find(
          id => id !== currentUser.$id
        );

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

  if (!receiver) return null;

  return (

    <div className="h-20 bg-[#111827] border-b border-slate-700 px-6 flex justify-between items-center">

      {/* Left */}

      <div className="flex items-center gap-4">

        <div className="relative">

          <img
            src={
              receiver.profileImagePreview ||
              profileimg
            }
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#111827]
            ${
              receiver.isonline
                ? "bg-green-500"
                : "bg-slate-500"
            }`}
          />

        </div>

        <div>

          <h2 className="text-white font-semibold text-lg">

            {receiver.name}

          </h2>

          <p className="text-slate-400 text-sm">

            {receiver.designation}

          </p>

          <span className="text-xs">

            {

              receiver.isonline ?

              <span className="text-green-400">

                Online

              </span>

              :

              <span className="text-slate-500">

                Last seen {

                  receiver.lastseen ?

                  formatDistanceToNow(
                    new Date(receiver.lastseen),
                    {
                      addSuffix: true,
                    }
                  )

                  :

                  "recently"

                }

              </span>

            }

          </span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button
          className="text-slate-500 hover:text-violet-400 transition"
        >

          <FaPhoneAlt />

        </button>

        <button
          className="text-slate-500 hover:text-violet-400 transition"
        >

          <FaVideo />

        </button>

        <button
          className="text-slate-500 hover:text-violet-400 transition"
        >

          <FaEllipsisV />

        </button>

      </div>

    </div>

  );

}