import { useEffect, useState } from "react";
import { account, database } from "../../BackendServices/AppWrite";
import {
  FaSun,
  FaMoon,
  FaCloudSun,
  FaCircle,
} from "react-icons/fa";

export default function WelcomeBanner() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const authUser = await account.get();

        const profile = await database.getDocument(
          import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_USER,
          authUser.$id
        );

        setUser(profile);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUser();

  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening";
  let icon = <FaMoon />;

  if (hour >= 5 && hour < 12) {

    greeting = "Good Morning";

    icon = <FaSun />;

  }

  else if (hour >= 12 && hour < 17) {

    greeting = "Good Afternoon";

    icon = <FaCloudSun />;

  }

  const today = new Date().toLocaleDateString("en-US", {

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric",

  });

  return (

    <section
      className="
      rounded-3xl
      p-8
      bg-gradient-to-r
      from-violet-700
      via-purple-700
      to-indigo-700
      shadow-xl
      border
      border-violet-500/30
      flex
      justify-between
      items-center
      "
    >

      {/* Left */}

      <div>

        <div className="flex items-center gap-3 text-4xl font-bold text-white">

          {icon}

          <h1>

            {greeting},

            <span className="capitalize ml-2">

              {user?.name || "Developer"}

            </span>

            👋

          </h1>

        </div>

        <p className="mt-4 text-violet-100 text-lg">

          Welcome back to

          <span className="font-semibold">

            {" "}CodeSphere

          </span>

          . Build, connect and inspire developers around the world.

        </p>

      </div>

      {/* Right */}

      <div className="text-right">

        <p className="text-white font-semibold text-xl">

          {today}

        </p>

        <div className="flex justify-end items-center gap-2 mt-3">

          <FaCircle
            className={`text-xs ${
              user?.isonline
                ? "text-green-400"
                : "text-red-400"
            }`}
          />

          <span className="text-violet-100">

            {user?.isonline

              ? "Online"

              : "Offline"}

          </span>

        </div>

      </div>

    </section>

  );

}