import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Home: NextPage = () => {
  const { data: session } = useSession();

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
        </>
      )}
    </div>
  );
};

export default Home;
