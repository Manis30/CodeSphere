import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaUserPlus,
  FaArrowRight,
  FaEllipsisH,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import SkillBadge from "./SkillsBadge";

export default function DeveloperCard({ developer }) {
  console.log('developer data:',developer)
  const navigate = useNavigate();

  return (

    <div className="bg-[#111827] border border-slate-700 rounded-3xl p-7 hover:border-violet-500 hover:-translate-y-1 transition-all duration-300">

      {/* Top */}

      <div className="flex justify-between">

        <img
          src={developer.profileimagepreview}
          className="w-20 h-20 rounded-full border-4 border-violet-500 object-cover"
        />

        <button className="text-slate-500 hover:text-white">

          <FaEllipsisH />

        </button>

      </div>

      {/* Name */}

      <div className="mt-5">

        <h2 className="text-2xl capitalize font-bold text-white">

          {developer.name}

        </h2>

        <p className="text-violet-400 capitalize mt-1">

          {developer.designation}

        </p>

        <div className="flex capitalize items-center gap-2 mt-2 text-slate-500">

          <FaMapMarkerAlt />

          {developer.location || "Unknown"}

        </div>

      </div>

      {/* Skills */}

      <div className="flex capitalize flex-wrap gap-2 mt-6">

        {

          developer.skills.slice(0,4).map(skill=>(

            <SkillBadge
              key={skill}
              skill={skill}
            />

          ))

        }

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 mt-8 border-y border-slate-700 py-5">

        <div className="text-center">

          <h3 className="text-2xl text-white font-bold">

            {developer.followers}

          </h3>

          <p className="text-slate-400 text-sm">

            Followers

          </p>

        </div>

        <div className="text-center">

          <h3 className="text-2xl text-white font-bold">

            {developer.following}

          </h3>

          <p className="text-slate-400 text-sm">

            Following

          </p>

        </div>

      </div>

      <button
        onClick={()=>navigate(`/view-profile/${developer.$id}`)}
        className="w-full mt-5 flex justify-between items-center text-white hover:text-violet-400 transition"
      >

        <span className="font-medium">

          View Profile

        </span>

        <FaArrowRight />

      </button>
      <div className="grid grid-cols-2 gap-4 mt-5">

  <button
   onClick={()=>navigate(`/chat/${developer.$id}`)}
    className="
      flex items-center justify-center gap-2
      border border-violet-500
      bg-violet-500/10
      text-white
      py-3 rounded-xl
      hover:bg-violet-500/20
      transition
    "
  >
    <FaEnvelope className="text-white" />
    <span className="text-white font-medium">Message</span>
  </button>

  <button
    className="
      flex items-center justify-center gap-2
      bg-gradient-to-r
      from-violet-600
      to-purple-600
      text-white
      py-3 rounded-xl
      hover:opacity-90
      transition
    "
  >
    <FaUserPlus className="text-white" />
    <span className="text-white font-medium">Follow</span>
  </button>

</div>

    </div>

  );

}