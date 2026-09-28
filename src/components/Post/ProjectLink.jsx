export default function ProjectLink({ formData, handleChange }) {

    return (

        <section className="bg-[#111827] rounded-2xl p-6 border border-slate-700 mb-6">

            <label className="text-white font-semibold">

                Project Link

            </label>

            <input
                type="text"
                name="projectlink"
                value={formData.projectlink}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full mt-4 bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white"
            />

        </section>

    );

}