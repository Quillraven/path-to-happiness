import { useRouter } from "next/router";
import { api } from "../utils/api";
import { BucketList } from "../components/BucketList";

export default function ViewBucketLists() {

  const router = useRouter();
  const { data } = api.bucketList.findMany.useQuery({});
  const { bucketLists } = data || {};

  return (
    <>
      <button className={"btn btn-primary btn-outline mb-2 "} onClick={() => router.back()}>Back</button>
      <div className={"carousel carousel-vertical w-full lg:w-1/3"}>
        {bucketLists?.map((bucketList) => {
          return (
            <div key={bucketList.id}>
              <BucketList bucketList={bucketList} />
              <div className="divider"></div>
            </div>
          );
        })}
      </div>
    </>
  );
}