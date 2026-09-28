import {
  FaHome,
  FaUser,
  FaCompass,
  FaPlusCircle,
  FaRegNewspaper,
  FaBookmark,
  FaEnvelope,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, replace } from "react-router";
import { account, database } from "../../../BackendServices/AppWrite";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export default function UserSidebar() {
  const navigate=useNavigate();
  const logout=async(e)=>{
    e.preventDefault();
    try {
      const user=await account.get()
      const confirmation=window.confirm("Are you sure, you want to logout?")
      if(!confirmation)
      return
       
      const updateUser=await database.updateDocument(
         import.meta.env.VITE_DATABASE,
          import.meta.env.VITE_USER,
          user.$id,
          {
            lastseen:new Date().toISOString(),
            isonline:false
          }
      )
      const deletesession=await account.deleteSession("current");
      toast.success("Logout sucessfully")
      navigate('/signin',{replace:true})
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
    {
    name: "Create Post",
    path: "/create-post",
    icon: <FaPlusCircle />,
  },
  {
      name: "My Posts",
      icon: <FaRegNewspaper />,
      path: "/mypost",
    },
    {
      name: "Explore",
      icon: <FaCompass />,
      path: "/explore",
    },
    
    // {
    //   name: "Bookmarks",
    //   icon: <FaBookmark />,
    //   path: "/bookmarks",
    // },
    {
      name: "Messages",
      icon: <FaEnvelope />,
      path: "/chat",
    },
    // {
    //   name: "Notifications",
    //   icon: <FaBell />,
    //   path: "/notifications",
    // },
    // {
    //   name: "Settings",
    //   icon: <FaCog />,
    //   path: "/settings",
    // },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#0B1120] border-r border-slate-800 flex flex-col justify-between">

      {/* Top */}

      <div>

        {/* Logo */}

        <div className="px-8 py-8">

          <h1 className="text-3xl font-bold text-white">

            Code<span className="text-violet-500">Sphere</span>

          </h1>

        </div>

        {/* Menu */}

        <nav className="px-4 space-y-2">

          {menus.map((menu) => (

            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                    : "text-slate-400 hover:bg-[#111827] hover:text-white"
                }`
              }
            >
              <span className="text-lg">{menu.icon}</span>

              <span className="font-medium">
                {menu.name}
              </span>

            </NavLink>

          ))}

        </nav>

      </div>

      {/* Logout */}

      <div className="px-4 pb-2">

        <button type="button" onClick={logout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}