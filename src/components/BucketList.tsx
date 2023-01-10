import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function BucketList({ bucketList: data }: { bucketList: RouterOutputs["bucketList"]["findMany"]["bucketLists"][number] }) {

  return (
    <div className="hero bg-base-200 justify-items-start">
      <div className="hero-content flex-col lg:flex-row">

        <div className="card w-md bg-base-100 shadow-xl">
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
            <h2 className="card-title">{data.author.name}</h2>
            <p>Created: {dayjs(data.createdAt).fromNow()}</p>
            <p>Last updated: {dayjs(data.updatedAt).fromNow()}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Like</button>
              <button className="btn btn-error">Report</button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-bold">Bucket List</h1>
          {/*author's bucket list */}
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