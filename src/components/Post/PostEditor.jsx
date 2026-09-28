export default function PostEditor({ formData, handleChange }) {

    return (

        <section className="bg-[#111827] rounded-2xl p-6 border border-slate-700 mb-6">

            <label className="text-white font-semibold">

                Description

            </label>

            <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Share your project..."
                className="w-full mt-4 bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white resize-none"
            />

        </section>

    );

}