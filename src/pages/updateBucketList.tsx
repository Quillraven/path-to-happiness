import { CreateBucketList } from "../components/CreateBucketList";
import { useRouter } from "next/router";

export default function UpdateBucketList() {

  const router = useRouter();

  return (
    <div className={"flex flex-col items-center [&>*]:m-1"}>
      <button className={"btn btn-primary btn-outline"} onClick={() => router.back()}>Back</button>
      <CreateBucketList />
    </div>
  );
}