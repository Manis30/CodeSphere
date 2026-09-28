import {
  FaGithub,
  FaLinkedin,
  FaGlobe
} from "react-icons/fa";

export default function SocialLinks({data}) {
  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white">
        Social Links
      </h2>
      <div className="flex gap-8 mt-6">
        {data.github&& <a href={data.github} target="_blank"><FaGithub size={28} className="text-white" /></a>}
        {data.linkedin&& <a href={data.linkedin} target="_blank">  <FaLinkedin size={28} className="text-blue-500"/></a>}
        {data.portfolio&& <a href={data.portfolio} target="_blank"><FaGlobe size={28} className="text-green-500"/></a>}
      </div>

    </section>
  );
}