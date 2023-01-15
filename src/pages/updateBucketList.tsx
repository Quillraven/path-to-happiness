import { CreateBucketList } from "../components/CreateBucketList";

export default function UpdateBucketList() {
  return (
    <div className={"flex flex-col items-center [&>*]:m-1"}>
      <CreateBucketList />
    </div>
  );
}
