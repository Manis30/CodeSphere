import { FaComments } from "react-icons/fa";

export default function EmptyChat() {

  return (

    <div className="flex-1 flex justify-center items-center bg-[#0F172A]">

      <div className="text-center">

        <div className="w-28 h-28 rounded-full bg-violet-600/20 flex justify-center items-center mx-auto">

          <FaComments
            className="text-violet-500"
            size={50}
          />

        </div>

        <h2 className="text-3xl font-bold text-white mt-8">

          Welcome to CodeSphere Chat

        </h2>

        <p className="text-slate-400 mt-3 max-w-md">

          Select a conversation from the left sidebar
          and start chatting with developers in real time.

        </p>

      </div>

    </div>

  );

}