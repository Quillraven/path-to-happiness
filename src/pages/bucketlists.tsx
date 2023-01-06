import { useRouter } from "next/router";

export default function BucketLists() {

  const router = useRouter();

  return (
    <div>
      <h1>Bucket Lists</h1>
      <button className={"btn btn-primary btn-outline"} onClick={() => router.back()}>Back</button>
    </div>
  );
}