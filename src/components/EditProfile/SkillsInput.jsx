import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function SkillsInput({
  formData,
  setFormData,
}) {

  const [skill, setSkill] = useState("");

  const addSkill = (e) => {

    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = skill.trim();

    if (!value) return;

    if (formData.skills.includes(value)) {
      setSkill("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));

    setSkill("");

  };

  const removeSkill = (selectedSkill) => {

    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (item) => item !== selectedSkill
      ),
    }));

  };

  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">

        Skills

      </h2>

      <input
        type="text"
        placeholder="Type a skill and press Enter"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={addSkill}
        className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-violet-500"
      />

      <div className="flex flex-wrap gap-3 mt-6">

        {formData.skills.map((item) => (

          <div
            key={item}
            className="flex items-center gap-2 bg-violet-600/20 text-violet-300 px-4 py-2 rounded-full"
          >

            <span>{item}</span>

            <button
              onClick={() => removeSkill(item)}
              className="hover:text-red-400"
            >
              <FaTimes />
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}