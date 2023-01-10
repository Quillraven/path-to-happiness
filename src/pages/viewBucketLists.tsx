import { useRouter } from "next/router";
import { api } from "../utils/api";
import { BucketList } from "../components/BucketList";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ViewBucketLists() {

  const router = useRouter();
  const { data } = api.bucketList.findMany.useQuery({});
  const { bucketLists } = data || {};

  return (
    <>
      <Header />

      {/* content */}
      <button className={"btn btn-primary btn-outline"} onClick={() => router.back()}>Back</button>
      <div>
        <h1>Bucket Lists</h1>
        {bucketLists?.map((bucketList) => {
          return (
            <div key={bucketList.id}>
              <BucketList bucketList={bucketList} />
              <div className="divider"></div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}