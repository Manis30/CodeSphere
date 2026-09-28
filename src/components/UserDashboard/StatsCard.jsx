import { useEffect, useState } from "react";
import { account, database } from "../../BackendServices/AppWrite";
import { Query } from "appwrite";
import {
  FaFileAlt,
  FaUsers,
  FaUserFriends,
  FaComments,
} from "react-icons/fa";

export default function StatsCards() {

  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
    chats: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const authUser = await account.get();

        const profile = await database.getDocument(
          import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_USER,
          authUser.$id
        );

        const posts = await database.listDocuments(
          import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_POST,
          [
            Query.equal("userid", authUser.$id),
          ]
        );

        const conversations = await database.listDocuments(
          import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_CONVERSATION,
          [
            Query.contains("participants", authUser.$id),
          ]
        );

        setStats({
          posts: posts.total,
          followers: profile.followers || 0,
          following: profile.following || 0,
          chats: conversations.total,
        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  const cards = [

    {
      title: "Posts",
      value: stats.posts,
      icon: <FaFileAlt />,
      color: "from-violet-600 to-purple-600",
    },

    {
      title: "Followers",
      value: stats.followers,
      icon: <FaUsers />,
      color: "from-blue-600 to-cyan-600",
    },

    {
      title: "Following",
      value: stats.following,
      icon: <FaUserFriends />,
      color: "from-pink-600 to-rose-600",
    },

    {
      title: "Chats",
      value: stats.chats,
      icon: <FaComments />,
      color: "from-emerald-600 to-green-600",
    },

  ];

  return (

    <div className="grid grid-cols-4 gap-6 mt-8">

      {

        cards.map((card) => (

          <div
            key={card.title}
            className="
            bg-[#111827]
            border
            border-slate-700
            rounded-2xl
            p-6
            hover:border-violet-500
            hover:-translate-y-1
            transition-all
            duration-300"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">

                  {card.title}

                </p>

                <h2 className="text-4xl font-bold text-white mt-3">

                  {card.value}

                </h2>

              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-2xl
                  text-white
                  bg-gradient-to-r
                  ${card.color}
                `}
              >

                {card.icon}

              </div>

            </div>

          </div>

        ))

      }

    </div>

  );

}