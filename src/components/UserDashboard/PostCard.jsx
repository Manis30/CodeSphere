import {
  FaHeart,
  FaComment,
  FaBookmark,
  FaPaperPlane,
  FaEllipsisH,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import profileimg from '../../assets/profileimg.jpeg'

export default function PostCard({
  post,
  user,
  isOwner = false,
}) {

  return (

    <article className="bg-[#111827] border border-slate-700 rounded-2xl p-6 hover:border-violet-500 transition">

      {/* Header */}

      <div className="flex justify-between">

        <div className="flex gap-4">

          <img
            src={
              user?.profileimagePreview ||
              profileimg
            }
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>

            <h2 className="text-white font-semibold text-lg">

              {user?.name}

            </h2>

            <p className="text-violet-400 text-sm">

              {user?.designation}

            </p>

            <p className="text-slate-500 text-xs mt-1">

              {

                formatDistanceToNow(

                  new Date(post.$createdAt),

                  {

                    addSuffix:true

                  }

                )

              }

            </p>

          </div>

        </div>

        {

          isOwner &&

          <button className="text-slate-500 hover:text-white">

            <FaEllipsisH/>

          </button>

        }

      </div>

      {/* Content */}

      <div className="mt-6">

        <p className="text-slate-300 leading-8 whitespace-pre-wrap">

          {post.content}

        </p>

      </div>

      {/* Image */}

      {

        post.imagePreview &&

        <img

          src={post.imagePreview}

          className="mt-6 rounded-xl w-full max-h-[450px] object-cover"

        />

      }

      {/* Tags */}

      {

        post.tags?.length>0 &&

        <div className="flex flex-wrap gap-2 mt-5">

          {

            post.tags.map(tag=>(

              <span

                key={tag}

                className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm"

              >

                #{tag}

              </span>

            ))

          }

        </div>

      }

      {/* Actions */}

      <div className="flex justify-between mt-6 border-t border-slate-700 pt-5">

        <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition">

          <FaHeart/>

          {post.likes || 0}

        </button>

        <button className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition">

          <FaComment/>

          {post.comments || 0}

        </button>

        <button className="flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition">

          <FaBookmark/>

          Save

        </button>

        <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition">

          <FaPaperPlane/>

          Share

        </button>

      </div>

    </article>

  );

}