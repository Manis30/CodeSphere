import {
  FaMapMarkerAlt,
  FaUserPlus,
  FaEnvelope,
  FaPen
} from "react-icons/fa";
import { useNavigate } from "react-router";
import signup from '../../assets/signup.png';
import profileimg from '../../assets/profileimg.jpeg'
export default function ProfileHeader({data,isOwnProfile}) {
  console.log(data,'response')
  const navigate=useNavigate()
  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl overflow-hidden">

      {/* Cover */}

      <div className="h-56 ">
          <img src={data?.coverimagePreview||signup} className="h-full w-full object-cover"/>
      </div>

      <div className="px-8 pb-8">

        <div className="-mt-16 flex items-end justify-between">

          <div className="flex items-end gap-6">

            <img
              src={data?.profileimagePreview||profileimg}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-[#111827]"
            />

            <div className="pb-3">

              <h1 className="text-3xl capitalize font-bold text-white">
                {data.name}
              </h1>

              <p className="text-slate-400 capitalize mt-2">
                {data.designation}
              </p>

              <p className="flex items-center capitalize gap-2 text-slate-500 mt-2">

                <FaMapMarkerAlt />

               {data.location}

              </p>

            </div>

          </div>

        <div className="flex items-center gap-3">

  {isOwnProfile ? (

    <button
      onClick={() => navigate("/edit-profile")}
      className="flex items-center gap-2 px-6 py-3 rounded-xl
      bg-gradient-to-r from-violet-600 to-purple-600
      hover:from-violet-500 hover:to-purple-500
      text-white font-medium transition-all duration-300
      shadow-lg shadow-violet-500/20"
    >
      <FaPen size={14} />
      Edit Profile
    </button>

  ) : (

    <>
      <button onClick={()=>{navigate(`/chat/:${data.id}`)}}
        className="flex items-center gap-2 px-5 py-3 rounded-xl
        border border-slate-600
        bg-slate-800
        hover:bg-slate-700
        text-white
        transition-all duration-300"
      >
        <FaEnvelope />
        Message
      </button>

      <button
        className="flex items-center gap-2 px-5 py-3 rounded-xl
        bg-gradient-to-r from-violet-600 to-purple-600
        hover:from-violet-500 hover:to-purple-500
        text-white
        font-medium
        transition-all duration-300
        shadow-lg shadow-violet-500/20"
      >
        <FaUserPlus />
        Follow
      </button>
    </>

  )}

</div>

        </div>

        <p className="text-slate-300 mt-6 leading-8">
          {data.bio}
        </p>

      </div>

    </section>
  );
}