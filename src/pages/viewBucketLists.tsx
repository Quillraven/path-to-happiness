import { api } from "../utils/api";
import { BucketList } from "../components/BucketList";
import { useVScroll } from "../hooks/hooks";
import { useState } from "react";

export default function ViewBucketLists() {
  const { data, hasNextPage, fetchNextPage, isFetching } = api.bucketList.findMany.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const bucketLists = data?.pages.flatMap((page) => page.bucketLists) || [];
  const [error, setError] = useState("");

  // load more bucket lists when v-scroll is > 90%
  useVScroll(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage().catch((err) => setError(err.message));
    }
  }, 0.9);

  return (
    <>
      <div className={"w-full lg:w-1/3"}>
        {/* Bucket Lists  */}
        {bucketLists?.map((bucketList, idx) => {
          return (
            <div key={bucketList.id}>
              <BucketList bucketList={bucketList} />
              {idx !== bucketLists.length - 1 && <div className="divider"></div>}
            </div>
          );
        })}

        {/* progress when loading more bucket lists */}
        <progress
          className={`progress progress-primary mt-4 h-3 px-2 ${isFetching ? "" : "invisible"}`}
        ></progress>

        {/* alert in case of any error */}
        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
