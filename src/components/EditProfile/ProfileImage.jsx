import { FaCamera } from "react-icons/fa";

export default function ProfileImages({
  formData,
  setFormData,
}) {

  const handleImageChange = (e) => {

    const { name, files } = e.target;

    if (!files || files.length === 0) return;

    const file = files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: URL.createObjectURL(file),
    }));

  };

  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl overflow-hidden">
      <div className="relative h-56">
        <img
          src={
            formData.coverimagePreview ||
            "https://placehold.co/1200x300/312e81/ffffff?text=Cover+Image"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <label
          htmlFor="coverimage"
          className="absolute bottom-4 right-4 cursor-pointer bg-black/60 hover:bg-black/80 px-4 py-2 rounded-lg text-white flex items-center gap-2"
        >
          <FaCamera />
          Change Cover
        </label>

        <input
          id="coverimage"
          type="file"
          accept="image/*"
          name="coverimage"
          className="hidden"
          onChange={handleImageChange}
        />

      </div>

      {/* Profile Image */}

      <div className="flex justify-center -mt-16 pb-8">

        <div className="relative">

          <img
            src={
              formData.profileimagePreview ||
              "https://placehold.co/200x200/7c3aed/ffffff?text=Profile"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#111827] object-cover"
          />

          <label
            htmlFor="profileimage"
            className="absolute bottom-1 right-1 bg-violet-600 hover:bg-violet-500 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <FaCamera className="text-white" />
          </label>

          <input
            id="profileimage"
            type="file"
            accept="image/*"
            name="profileimage"
            className="hidden"
            onChange={handleImageChange}
          />

        </div>

      </div>

    </section>
  );
}