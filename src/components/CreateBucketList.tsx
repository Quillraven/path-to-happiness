import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "../utils/api";
import { z } from "zod";
import { Modal } from "./generic/Modal";
import { BucketList } from "./BucketList";

export const bucketListSchema = z.object({
  entries: z.array(
    z.string()
      .min(1, "must not be empty")
      .max(100, "must not be longer than 100 characters")
  )
});

export function CreateBucketList() {
  const [showForm, setShowForm] = useState(false);
  const [entries, setEntries] = useState([""]);
  const [error, setError] = useState("");
  const apiCtx = api.useContext();
  const { mutateAsync: createBucketList } = api.bucketList.create.useMutation(
    { onSuccess: () => apiCtx.bucketList.findByUser.invalidate() }
  );
  const { data: userBucketList } = api.bucketList.findByUser.useQuery();

  function handleSubmit(event: FormEvent<HTMLFormElement>, form: HTMLFormElement) {
    event.preventDefault();

    const newEntries = new Array<string>();
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i] as HTMLInputElement;
      if (element.type === "text") {
        newEntries.push(element.value);
      }
    }

    const parseResult = bucketListSchema.safeParse({ entries: newEntries });
    if (!parseResult.success) {
      setError(
        parseResult.error.errors
          .map((error) => `error with ${error.path}: ${error.message}`)
          .join("\n")
      );
      return;
    }

    createBucketList({ entries: newEntries as [string, ...string[]] });
    setEntries(newEntries);
    setError("");
    setShowForm(false);
  }

  function handleBucketListItemClick(remove: boolean, idx: number) {
    if (remove) {
      setEntries(entries.filter((_, index) => index !== idx));
    } else {
      setEntries([...entries, ""]);
    }
  }

  function handleBucketListItemChange(event: FormEvent<HTMLInputElement>, idx: number) {
    const newEntries = [...entries];
    newEntries[idx] = event.currentTarget.value;
    setEntries(newEntries);
  }

  return (
    <div className={"flex flex-col items-center justify-center"}>
      {/* button to open form modal */}
      <button className={"btn-outline btn-secondary btn mb-2"} onClick={() => setShowForm(true)}>
        Create Bucket List
      </button>

      {/* form modal */}
      <Modal
        title={"Enter your bucket list!"}
        showState={[showForm, setShowForm]}
        description={"Some fancy description!"}
      >
        {/* form entries for bucket list */}
        <form onSubmit={(e) => handleSubmit(e, e.currentTarget)}>
          {entries.map((entryStr, idx) => {
            const isNotLastItem = idx < entries.length - 1;
            return (
              <div key={`bucketlist-item-div-${idx}`} className={"flex-row justify-between"}>
                <input
                  type={"text"}
                  key={`bucketlist-item-${idx}`}
                  placeholder={"bucket item"}
                  value={entryStr}
                  className={"input-bordered input-primary input mb-2 w-full max-w-xs"}
                  onChange={(e) => handleBucketListItemChange(e, idx)}
                  autoFocus={idx === 0}
                />
                <button
                  type={"button"}
                  className={`btn-outline btn ${isNotLastItem ? "btn-error" : "btn-accent"} ml-2`}
                  onClick={() => handleBucketListItemClick(isNotLastItem, idx)}
                >
                  {isNotLastItem ? "x" : "+"}
                </button>
              </div>
            );
          })}

          <div className={"modal-action"}>
            <button className={"btn-primary btn"} type="submit">
              Add
            </button>
          </div>
        </form>
      </Modal>

      {/* user bucket list, if it exists */}
      {userBucketList && <BucketList bucketList={userBucketList} />}

      {/* error alert */}
      {error && (
        <div className="alert alert-error fixed bottom-0 left-2 bottom-2 mx-auto max-w-md shadow-lg">
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
            <div className={"whitespace-pre-wrap"}>{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}
