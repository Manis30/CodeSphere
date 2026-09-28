export default function AboutSection() {
  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white">
        About
      </h2>

      <div className="grid grid-cols-2 gap-8 mt-6 text-slate-300">

        <div>
          <h3 className="text-slate-500">College</h3>
          <p>IFET College of Engineering</p>
        </div>

        <div>
          <h3 className="text-slate-500">Experience</h3>
          <p>Fresher</p>
        </div>

        <div>
          <h3 className="text-slate-500">Location</h3>
          <p>Tamil Nadu, India</p>
        </div>

        <div>
          <h3 className="text-slate-500">Joined</h3>
          <p>August 2026</p>
        </div>

      </div>

    </section>
  );
}