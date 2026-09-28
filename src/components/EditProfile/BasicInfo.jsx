export default function BasicInfo({
  formData,
  errors,
  handleChange,
}) {
  return (
    <section className="bg-[#111827] border border-slate-700 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Name */}

        <div>
          <label className="text-slate-300 text-sm block mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-violet-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-2">
              {errors.name}
            </p>
          )}
        </div>

        {/* Username */}

        <div>
          <label className="text-slate-300 text-sm block mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-violet-500"
          />

          {errors.username && (
            <p className="text-red-500 text-sm mt-2">
              {errors.username}
            </p>
          )}
        </div>

        {/* Role */}

        <div>
          <label className="text-slate-300 text-sm block mb-2">
            Designation
          </label>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-violet-500"
          />

          {errors.designation && (
            <p className="text-red-500 text-sm mt-2">
              {errors.designation}
            </p>
          )}
        </div>

        {/* Location */}

        <div>
          <label className="text-slate-300 text-sm block mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Tamil Nadu, India"
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-violet-500"
          />

          {errors.location && (
            <p className="text-red-500 text-sm mt-2">
              {errors.location}
            </p>
          )}
        </div>

      </div>

      {/* Bio */}

      <div className="mt-6">

        <label className="text-slate-300 text-sm block mb-2">
          Bio
        </label>

        <textarea
          rows={5}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write something about yourself..."
          className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white resize-none outline-none focus:border-violet-500"
        />

        {errors.bio && (
          <p className="text-red-500 text-sm mt-2">
            {errors.bio}
          </p>
        )}

      </div>

    </section>
  );
}