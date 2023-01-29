import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiMaildotru } from "react-icons/si";
import { useRef } from "react";
import { z } from "zod";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const mailRef = useRef<HTMLInputElement | null>(null);

  async function mailSignIn() {
    if (z.string().email().safeParse(mailRef.current?.value, {})?.success) {
      await signIn("email", { email: mailRef.current?.value });
    }
  }

  return (
    <div className={"flex flex-col items-center justify-center [&>*]:m-1"}>
      {/*view bucket lists of all users*/}
      <Link href={"/viewBucketLists"}>
        <button className={"btn-secondary btn"}>View bucket lists</button>
      </Link>

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
          {/*when logged out -> allow log in via different providers*/}
          <button className={"btn-primary btn"} onClick={() => signIn("discord")}>
            Login with <FaDiscord className={"ml-2 text-2xl"} />
          </button>
          <button className={"btn-primary btn"} onClick={() => signIn("google")}>
            Login with <FcGoogle className={"ml-2 text-2xl"} />
          </button>

          <div className={"flex flex-col items-center justify-center lg:flex-row"}>
            <button className={"btn-primary btn lg:ml-[216px]"}
                    onClick={mailSignIn}
            >
              Login with <SiMaildotru className={"ml-2 text-2xl"} />
            </button>
            <input type="text"
                   ref={mailRef}
                   placeholder="mail@example.com"
                   className="input input-bordered input-secondary mt-2 w-52 lg:ml-2 lg:mt-0"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
