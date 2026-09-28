import { useState } from "react";

export default function TagsInput({
    formData,
    setFormData
}) {

    const [tag, setTag] = useState("");

    const addTag = () => {

        if (!tag.trim()) return;

        setFormData((prev) => ({
            ...prev,
            tags: [...prev.tags, tag]
        }));

        setTag("");

    };

    return (

        <section className="bg-[#111827] rounded-2xl p-6 border border-slate-700 mb-6">

            <label className="text-white font-semibold">

                Tags

            </label>

            <div className="flex gap-3 mt-4">

                <input
                    value={tag}
                    onChange={(e)=>setTag(e.target.value)}
                    className="flex-1 bg-[#0F172A] border border-slate-700 rounded-xl p-3 text-white"
                />

                <button
                    onClick={addTag}
                    className="bg-violet-600 px-5 rounded-xl"
                >
                    Add
                </button>

            </div>

            <div className="flex flex-wrap gap-3 mt-5">

                {
                    formData.tags.map((item,index)=>

                        <span
                            key={index}
                            className="bg-violet-700 px-4 py-2 rounded-full"
                        >
                            {item}
                        </span>

                    )
                }

            </div>

        </section>

    );

}