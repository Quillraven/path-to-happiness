import { useRouter } from "next/router";
import { api } from "../utils/api";
import { BucketList } from "../components/BucketList";

export default function BucketLists() {

  const router = useRouter();
  const { data } = api.bucketList.findMany.useQuery({});
  const { bucketLists } = data || {};

  return (
    <div>
      <h1>Bucket Lists</h1>
      <button className={"btn btn-primary btn-outline"} onClick={() => router.back()}>Back</button>
      {bucketLists?.map((bucketList) => <BucketList bucketList={bucketList} key={bucketList.id} />)}
    </div>
  );
}