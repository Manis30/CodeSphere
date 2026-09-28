export default function SaveButton({
  handleSubmit,
  loading,
}) {
  return (
    <div className="flex justify-end mt-8 mb-10">

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
          loading
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </div>
  );
}