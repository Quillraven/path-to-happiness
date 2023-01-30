import { signIn, signOut, useSession } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

export const Login = () => {

  const { data: session } = useSession();
  const [mailInpError, setMailInpError] = useState(false);

  // e-mail login
  async function handleSubmit(event: FormEvent<HTMLFormElement>, form: HTMLFormElement) {
    event.preventDefault();

    const inpElement = form.elements.namedItem("inpMailAddress") as HTMLInputElement;
    if (z.string().email().safeParse(inpElement.value, {})?.success) {
      await signIn("email", { email: inpElement.value });
      setMailInpError(false);
    } else {
      setMailInpError(true);
    }
  }

  return (
    <>
      {session ? (
        <>
          {/*when logged in -> update your own bucket list*/}
          <Link href={"/updateBucketList"}>
            <button className={"btn-outline btn-secondary btn"}>Update my bucket list</button>
          </Link>
          <button className={"btn-primary btn"} onClick={() => signOut()}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center flex-wrap">
            <form onSubmit={(e) => handleSubmit(e, e.currentTarget)}>
              {/* Email input */}
              <input name={"inpMailAddress"}
                     type="text"
                     placeholder="Email address"
                     className="input input-bordered w-full mt-2"
              />

              {mailInpError &&
                <span className="flex items-center font-medium tracking-wide text-error text-md mt-1 ml-1">
                  Invalid mail format!
                </span>
              }

              {/* Submit button */}
              <button type="submit" name={"email"} className="btn-primary btn w-full mt-2">
                Sign in
              </button>

              <div className="divider font-bold">OR</div>

              {/* Discord */}
              <button type="button" name={"discord"} className={"btn-primary btn mr-1"}
                      onClick={() => signIn("discord")}
              >
                Sign in with <FaDiscord className={"ml-2 text-2xl"} />
              </button>

              {/* Google */}
              <button type="button" name={"google"} className={"btn-primary btn ml-1"}
                      onClick={() => signIn("google")}
              >
                Sign in with <FcGoogle className={"ml-2 text-2xl"} />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};