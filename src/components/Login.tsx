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
      inpElement.focus()
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
          <div className="flex justify-center items-center [&>*]:mx-2">
            <form onSubmit={(e) => handleSubmit(e, e.currentTarget)}>
              {/* Email input */}
              <input name={"inpMailAddress"}
                     type="text"
                     placeholder="Email address"
                     className={`input input-bordered input-${mailInpError ? "error" : "primary"} w-full mt-2`}
              />

              {mailInpError &&
                <span className="flex font-medium tracking-wide text-error mt-1 ml-2">
                  Invalid mail format!
                </span>
              }

              {/* Submit button for Mail signin */}
              <button type="submit" name={"email"} className="btn-primary btn w-full mt-2">
                Sign in
              </button>

              <div className="divider font-bold">OR</div>

              <div className={"flex justify-center [&>*]:mx-2"}>
                {/* Discord */}
                <button type="button" name={"discord"} className={"btn-primary btn"}
                        onClick={() => signIn("discord")}
                >
                  Sign in with <FaDiscord className={"ml-2 text-2xl"} />
                </button>

                {/* Google */}
                <button type="button" name={"google"} className={"btn-primary btn"}
                        onClick={() => signIn("google")}
                >
                  Sign in with <FcGoogle className={"ml-2 text-2xl"} />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};