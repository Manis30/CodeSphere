export default function SkillsSection({data}) {
  const skills =data.skills|| [
    "Java",
    "React",
    "Node.js",
    "MongoDB",
    "Appwrite",
    "Tailwind CSS",
    "SQL",
    "JavaScript",
  ];

  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white">
        Skills
      </h2>

      <div className="flex flex-wrap gap-4 mt-6">

        {skills.map((skill) => (

          <span
            key={skill}
            className="bg-violet-600/20 text-violet-400 px-5 py-2 rounded-full"
          >
            {skill}
          </span>

        ))}

      </div>

    </section>
  );
}