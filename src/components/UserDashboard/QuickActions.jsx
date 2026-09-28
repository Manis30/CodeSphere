import {
  FaPlusCircle,
  FaCompass,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router";

export default function QuickActions() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Create Post",
      subtitle: "Share your latest work",
      icon: <FaPlusCircle />,
      color: "from-violet-600 to-purple-600",
      path: "/create-post",
    },

    {
      title: "Explore",
      subtitle: "Discover developers",
      icon: <FaCompass />,
      color: "from-cyan-600 to-blue-600",
      path: "/explore",
    },

    {
      title: "Messages",
      subtitle: "Open your chats",
      icon: <FaComments />,
      color: "from-emerald-600 to-green-600",
      path: "/chat",
    },

    {
      title: "Profile",
      subtitle: "View your profile",
      icon: <FaUser />,
      color: "from-pink-600 to-rose-600",
      path: "/profile",
    },

  ];

  return (

    <section className="mt-8">

      <h2 className="text-2xl font-bold text-white mb-5">

        Quick Actions

      </h2>

      <div className="grid grid-cols-4 gap-6">

        {

          actions.map((action) => (

            <button

              key={action.title}

              onClick={() => navigate(action.path)}

              className="
              bg-[#111827]
              border
              border-slate-700
              rounded-2xl
              p-6
              text-left
              transition-all
              duration-300
              hover:border-violet-500
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-violet-500/20"

            >

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
                  ${action.color}
                `}

              >

                {action.icon}

              </div>

              <h3 className="text-white font-semibold text-lg mt-5">

                {action.title}

              </h3>

              <p className="text-slate-400 mt-2 text-sm">

                {action.subtitle}

              </p>

            </button>

          ))

        }

      </div>

    </section>

  );

}