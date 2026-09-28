import { useEffect, useState } from "react";
import { account, database, storage } from "../../BackendServices/AppWrite";
import { Query } from "appwrite";
import { useNavigate } from "react-router";
import profileimg from '../../assets/profileimg.jpeg'

export default function RecentChats() {

    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);

    useEffect(() => {

        const fetchChats = async () => {

            try {

                const currentUser = await account.get();

                const response = await database.listDocuments(

                    import.meta.env.VITE_DATABASE,

                    import.meta.env.VITE_CONVERSATION,

                    [

                        Query.contains("participants", currentUser.$id),

                        Query.orderDesc("$updatedAt"),

                        Query.limit(5),

                    ]

                );

                const chats = await Promise.all(

                    response.documents.map(async (conversation) => {

                        const receiverId = conversation.participants.find(

                            id => id !== currentUser.$id

                        );

                        const receiver = await database.getDocument(

                            import.meta.env.VITE_DATABASE,

                            import.meta.env.VITE_USER,

                            receiverId

                        );

                        let profileimagepreview = "";

                        if (receiver.profileimage) {

                            profileimagepreview = storage.getFileView(

                                import.meta.env.VITE_BUCKET_PROFILE_IMAGE,

                                receiver.profileimage

                            );

                        }

                        return {

                            ...conversation,

                            receiver: {

                                ...receiver,

                                profileimagepreview,

                            },

                        };

                    })

                );

                setConversations(chats);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchChats();

    }, []);

    return (

        <section className="bg-[#111827] rounded-2xl border border-slate-700 p-6">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold text-white">

                    Recent Chats

                </h2>

                <button

                    onClick={() => navigate("/chat")}

                    className="text-violet-400 text-sm hover:text-violet-300"

                >

                    View All

                </button>

            </div>

            <div className="mt-6 space-y-5">

                {

                    conversations.length === 0 ?

                        (

                            <p className="text-slate-500">

                                No conversations yet

                            </p>

                        )

                        :

                        conversations.map(chat => (

                            <button

                                key={chat.$id}

                                onClick={() => navigate(`/chat/${chat.receiver.$id}`)}

                                className="w-full flex justify-between items-center hover:bg-slate-800 rounded-xl p-2 transition"

                            >

                                <div className="flex gap-3">

                                    <img
                                        src={
                                            chat.receiver.profileimagepreview ||
                                            profileimg
                                        }

                                        className="w-12 h-12 rounded-full object-cover"

                                    />

                                    <div className="text-left">

                                        <h3 className="text-white font-semibold capitalize">

                                            {chat.receiver.name}

                                        </h3>

                                        <p className="text-slate-400 text-sm truncate w-36">

                                            {

                                                chat.lastmessage ||

                                                "Start chatting..."

                                            }

                                        </p>

                                    </div>

                                </div>

                                <span className="text-xs text-slate-500">

                                    {

                                        new Date(chat.$updatedAt)

                                            .toLocaleDateString()

                                    }

                                </span>

                            </button>

                        ))

                }

            </div>

        </section>

    );

}