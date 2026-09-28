import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function EmptyPosts() {

    const navigate = useNavigate();

    return (

        <div className="bg-[#111827] rounded-2xl border border-slate-700 p-20 text-center">

            <FaFileAlt
                className="mx-auto text-6xl text-violet-500"
            />

            <h2 className="text-3xl text-white mt-6">

                No Posts Yet

            </h2>

            <p className="text-slate-400 mt-3">

                Share your first project with the community.

            </p>

            <button
                onClick={() => navigate("/create-post")}
                className="mt-8 bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl"
            >

                Create Your First Post

            </button>

        </div>

    );

}