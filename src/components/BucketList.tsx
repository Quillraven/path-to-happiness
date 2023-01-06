import type { RouterOutputs } from "../utils/api";
import Image from "next/image";

export function BucketList({ bucketList: data }: { bucketList: RouterOutputs["bucketList"]["findMany"]["bucketLists"][number] }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-6 ml-4">

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

      <div className="card-body items-start text-center">
        {/*author name */}
        <h2 className="card-title self-center">{data.author.name}</h2>

        {/*author's bucket list */}
        {data.entries.map((entry, idx) => (
          <ul key={`List-${data.author.id}-${idx}`} className={"text-left"}>
            <li>{entry}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}