import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaExclamation, FaThumbsUp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { z } from "zod";

dayjs.extend(relativeTime);

export const likeSchema = z.object({ bucketListId: z.string() });

// prettier-ignore
export function BucketList({ bucketList }: { bucketList: RouterOutputs["bucketList"]["findMany"]["bucketLists"][number] }) {
  const apiCtx = api.useContext();
  const { data: session } = useSession();

  // when user likes/unlike a bucketlist then we will invalidate the bucketList query
  // to trigger a refetch the data, which will also update the UI (=like counter and hasLiked constant below)
  const likeMutation = api.bucketList.like.useMutation(
    { onSuccess: () => apiCtx.bucketList.invalidate() }
  ).mutateAsync;
  const unlikeMutation = api.bucketList.unlike.useMutation(
    { onSuccess: () => apiCtx.bucketList.invalidate() }
  ).mutateAsync;

  const hasLiked = bucketList.likes.some((like) => like.userId === session?.user?.id);

  async function handleLike() {
    if (!session) return;

    if (hasLiked) {
      await unlikeMutation({ bucketListId: bucketList.id });
    } else {
      await likeMutation({ bucketListId: bucketList.id });
    }
  }

  return (
    <div className="flex justify-center bg-base-200">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* user card */}
        <div className="card m-4 bg-base-100 shadow-xl min-w-fit lg:w-1/2">
          {/*user image */}
          {bucketList.user.image && (
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="mask mask-squircle w-24">
                  <Image src={bucketList.user.image} alt={"User Avatar"} width={50} height={50} />
                </div>
              </div>
            </figure>
          )}
          <div className="card-body items-start text-start">
            <h2 className="card-title self-center text-3xl font-bold">{bucketList.user.name}</h2>
            <div className={"flex flex-col"}>
              <p className={"grid-cols-2 mb-4"}>
                <b>Created</b>: {dayjs(bucketList.createdAt).fromNow()} <br />
                <b>Last updated</b>: {dayjs(bucketList.updatedAt).fromNow()}
              </p>

              {/* action buttons*/}
              <div className="card-actions self-center">
                <button className={`btn-success btn ${!hasLiked ? "bg-success/60" : ""}`} onClick={() => handleLike()}>
                  <FaThumbsUp />
                  <span className={`ml-2`}>{bucketList.likes.length}</span>
                </button>
                <button className="btn-error btn">
                  <FaExclamation />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*user's bucket list (on mobile it is below the card; on desktop it is in the same row) */}
        <div className={"mb-4 pl-8 lg:w-1/2 lg:pt-4"}>
          <ul>
            {bucketList.entries.map((entry, idx) => (
              <li
                key={`BucketList-Item-${bucketList.user.id}-${idx}`}
                className={"mr-4 list-disc break-words"}
              >
                {entry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
