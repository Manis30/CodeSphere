import { format } from "date-fns";
import {
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";

export default function MessageBubble({
  message,
  isMine,
}) {

  return (

    <div
      className={`flex mb-4 ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[420px] px-4 py-3 rounded-2xl shadow-md

        ${
          isMine

            ? "bg-violet-600 text-white rounded-br-md"

            : "bg-[#1E293B] text-slate-200 rounded-bl-md"

        }`}
      >


        <p className="leading-7 break-words whitespace-pre-wrap">

          {message.message}

        </p>

      

        <div
          className={`flex justify-end items-center gap-2 mt-2 text-[11px]

          ${
            isMine

              ? "text-violet-200"

              : "text-slate-400"

          }`}
        >

          <span>

            {

              format(
                new Date(message.$createdAt),
                "hh:mm a"
              )

            }

          </span>

          {

            isMine && (

              message.status === "seen"

                ?

                <FaCheckDouble
                  className="text-sky-400"
                />

                :

                message.status === "delivered"

                ?

                <FaCheckDouble />

                :

                <FaCheck />

            )

          }

        </div>

      </div>

    </div>

  );

}