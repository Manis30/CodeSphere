export default function Loading({
  fullScreen = true,
}) {
  return (
    <div
      className={`
        ${fullScreen ? "h-screen" : "h-full"}
        w-full
        flex
        items-center
        justify-center
        bg-[#0F172A]
      `}
    >
      <div className="relative w-20 h-20">

        <div className="absolute inset-0 rounded-full border-4 border-violet-900/30"></div>

        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500 animate-spin"></div>

        <div className="absolute inset-5 rounded-full bg-violet-600 animate-pulse shadow-[0_0_25px_#8B5CF6]"></div>

      </div>
    </div>
  );
}