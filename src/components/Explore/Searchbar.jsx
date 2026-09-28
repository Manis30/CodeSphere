import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="mt-8 relative">

      <FaSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        placeholder="Search by name, username, skills or designation..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-[#111827]
          border border-slate-700
          rounded-xl
          py-4
          pl-14
          pr-4
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-500/20
          transition
        "
      />

    </div>
  );
}