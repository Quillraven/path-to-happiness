import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaExclamation, FaThumbsUp } from "react-icons/fa";

dayjs.extend(relativeTime);

export function BucketList({ bucketList: data }: { bucketList: RouterOutputs["bucketList"]["findMany"]["bucketLists"][number] }) {

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row">

        {/* author card */}
        <div className="card bg-base-100 shadow-xl lg:w-1/2">
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
          <div className="card-body items-start text-start">
            <h2 className="card-title font-bold self-center text-3xl">{data.author.name}</h2>
            <p><b>Created</b>: {dayjs(data.createdAt).fromNow()} <br />
              <b>Last updated</b>: {dayjs(data.updatedAt).fromNow()}</p>
            <div className="card-actions self-center">
              <button className="btn btn-success"><FaThumbsUp /></button>
              <button className="btn btn-error"><FaExclamation /></button>
            </div>
          </div>
        </div>

        {/*author's bucket list (on mobile it is below the card; on desktop it is in the same row) */}
        <div className={"w-full lg:w-1/2 lg:ml-4"}>
          <ul>
            {data.entries.map((entry, idx) => (
              <li key={`BucketList-Item-${data.author.id}-${idx}`} className={"list-disc"}> {entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}