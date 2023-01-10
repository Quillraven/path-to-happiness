import { CreateBucketList } from "../components/CreateBucketList";
import { useRouter } from "next/router";

export function UpdateBucketList() {

  const router = useRouter();

  return (
    <div>
      <h1>Update Bucket List</h1>
      <button className={"btn btn-primary btn-outline"} onClick={() => router.back()}>Back</button>
      <CreateBucketList />
    </div>
  );
}