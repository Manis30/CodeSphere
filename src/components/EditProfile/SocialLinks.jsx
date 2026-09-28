import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

export default function SocialLinks({
  formData,
  errors,
  handleChange,
}) {
  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Social Links
      </h2>

      <div className="space-y-6">

        {/* Github */}

        <div>

          <label className="text-slate-300 text-sm mb-2 block">
            GitHub
          </label>

          <div className="relative">

            <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500"
            />

          </div>

          {errors.github && (
            <p className="text-red-500 text-sm mt-2">
              {errors.github}
            </p>
          )}

        </div>

        {/* LinkedIn */}

        <div>

          <label className="text-slate-300 text-sm mb-2 block">
            LinkedIn
          </label>

          <div className="relative">

            <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-lg" />

            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500"
            />

          </div>

          {errors.linkedin && (
            <p className="text-red-500 text-sm mt-2">
              {errors.linkedin}
            </p>
          )}

        </div>

        {/* Portfolio */}

        <div>

          <label className="text-slate-300 text-sm mb-2 block">
            Portfolio
          </label>

          <div className="relative">

            <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 text-lg" />

            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500"
            />

          </div>

          {errors.portfolio && (
            <p className="text-red-500 text-sm mt-2">
              {errors.portfolio}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}