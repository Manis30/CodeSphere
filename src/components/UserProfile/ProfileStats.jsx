export default function ProfileStats({data,postlen}) {
  const stats = [
    {
      title: "Posts",
      value: postlen,
    },
    {
      title: "Followers",
      value: data.followers,
    },
    {
      title: "Following",
      value: data.following,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-6 mt-8">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-[#111827] border border-slate-700 rounded-2xl p-6 text-center"
        >

          <h2 className="text-3xl font-bold text-violet-400">
            {item.value}
          </h2>

          <p className="text-slate-400 mt-2">
            {item.title}
          </p>

        </div>

      ))}

    </section>
  );
}