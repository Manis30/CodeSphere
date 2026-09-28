import { FaSearch } from "react-icons/fa";

export default function EmptyState() {

    return (

        <div className="bg-[#111827] border border-slate-700 rounded-3xl p-20 mt-8 text-center">

            <FaSearch
                className="text-6xl text-violet-500 mx-auto"
            />

            <h2 className="text-3xl text-white mt-6">

                No Developers Found

            </h2>

            <p className="text-slate-400 mt-3">

                Try searching with another keyword.

            </p>

        </div>

    );

}