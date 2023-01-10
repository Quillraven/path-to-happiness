import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaExclamation, FaThumbsUp } from "react-icons/fa";

dayjs.extend(relativeTime);

export function BucketList({ bucketList: data }: { bucketList: RouterOutputs["bucketList"]["findMany"]["bucketLists"][number] }) {

  return (
    <div className="hero bg-secondary-content justify-items-start max-w-2xl">
      <div className="hero-content flex-col lg:flex-row">

        {/* author card */}
        <div className="card max-w-md bg-base-100 shadow-xl">
          {/*author image */}
          {data.author.image &&
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="w-24 mask mask-squircle">
                  <Image src={data.author.image} alt={"Author Avatar"} width={50} height={50} />
                </div>
              </div>
            </figure>
          }
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-3xl">{data.author.name}</h2>
            <p><b>Created</b>: {dayjs(data.createdAt).fromNow()} <br />
              <b>Last updated</b>: {dayjs(data.updatedAt).fromNow()}</p>
            <div className="card-actions">
              <button className="btn btn-success"><FaThumbsUp /></button>
              <button className="btn btn-error"><FaExclamation /></button>
            </div>
          </div>
        </div>

        {/*author's bucket list (on mobile it is below the card; on desktop it is in the same row) */}
        <div>
          <h1 className="text-5xl font-bold">Bucket List</h1>
          {data.entries.map((entry, idx) => (
            <ul key={`List-${data.author.id}-${idx}`} className={"text-left"}>
              <li>{entry}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}