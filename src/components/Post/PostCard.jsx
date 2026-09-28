import {
  FaHeart,
  FaCommentAlt,
  FaGithub,
  FaEdit,
  FaTrash,
  FaEye,
  FaClock,
  FaExternalLinkAlt,
  FaEllipsisH,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import profileimg from '../../assets/coverimg.jpeg'
export default function MyPostCard({
  post,
  User,
  Delete,
  isOwnProfile = true,
  compact = false,
}) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-[#111827] border border-slate-700 rounded-3xl overflow-hidden shadow-lg hover:border-violet-500/70 hover:shadow-violet-500/10 transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between p-6">

        <div className="flex items-center gap-4">

          <img
            src={
              User.profileImagePreview ||
              profileimg
            }
            alt=""
            className="w-14 h-14 rounded-full object-cover border-2 border-violet-500"
          />

          <div>

            <h2 className="text-white text-lg font-semibold">
              {User.name}
            </h2>

            <p className="text-slate-400 text-sm">
              {User.designation}
            </p>

            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">

              <FaClock className="text-slate-400 text-xs" />

              <span className="text-xs text-slate-300">
                {formatDistanceToNow(
                  new Date(post.$createdAt),
                  {
                    addSuffix: true,
                  }
                )}
              </span>

            </div>

          </div>

        </div>

        <button className="text-slate-400 hover:text-white">

          <FaEllipsisH />

        </button>

      </div>

      {/* Description */}

      <div className="px-6">

        <p className="text-slate-300 leading-8">

          {post.description}

        </p>

      </div>

      {/* Image */}

      {post.postimage && (

        <div className="px-6 mt-6">

          <img
            src={post.imagepreview}
            alt=""
            className={`rounded-2xl w-full object-cover ${
              compact ? "h-52" : "h-72"
            }`}
          />

        </div>

      )}

      {/* Tags */}

      {!compact && post.tags?.length > 0 && (

        <div className="flex flex-wrap gap-3 px-6 mt-6">

          {post.tags.map((tag) => (

            <span
              key={tag}
              className="px-4 py-1.5 rounded-full bg-slate-800 border border-violet-500/30 text-violet-300 text-sm"
            >

              #{tag}

            </span>

          ))}

        </div>

      )}

      {/* Project Link */}

      {!compact && post.projectlink && (

        <div className="px-6 mt-5">

          <a
            href={post.projectlink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300"
          >

            <FaGithub />

            View Project

            <FaExternalLinkAlt className="text-xs" />

          </a>

        </div>

      )}

      {/* Divider */}

      <div className="mx-6 mt-6 border-t border-slate-700"></div>

      {/* Stats */}

      <div className="flex items-center gap-6 px-6 py-4">

        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">

          <FaHeart className="text-red-500" />

          <span className="text-slate-300 text-sm">

            {post.likes} Likes

          </span>

        </div>

        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">

          <FaCommentAlt className="text-sky-400" />

          <span className="text-slate-300 text-sm">

            {post.comments} Comments

          </span>

        </div>

      </div>

      {/* Actions */}

    {/* Actions */}

{!compact && isOwnProfile && (

<div className="border-t border-slate-700 grid grid-cols-2">

  <button
    onClick={() => navigate(`/edit-post/${post.$id}`)}
    className="flex justify-center items-center gap-2 py-4 text-slate-300 hover:bg-slate-800 hover:text-violet-400 transition"
  >
    <FaEdit />
    Edit
  </button>

  <button
    onClick={() => Delete(post.$id, post.postimage)}
    className="flex justify-center items-center gap-2 py-4 border-l border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-red-500 transition"
  >
    <FaTrash />
    Delete
  </button>

</div>

)}

    </div>
  );
}