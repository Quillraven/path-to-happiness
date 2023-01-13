import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

const Home: NextPage = () => {

  const { data: session, status } = useSession();

  return (
    <div className={"flex flex-col items-center justify-center [&>*]:m-1"}>
      {/*view bucket lists of all users*/}
      <Link href={"/viewBucketLists"}>
        <button className={"btn btn-secondary"}>View bucket lists</button>
      </Link>

      {session ? (
        <>
          {/*when logged in -> update your own bucket list*/}
          <Link href={"/updateBucketList"}>
            <button className={"btn btn-secondary btn-outline"}>Update my bucket list</button>
          </Link>
          <button className={"btn btn-primary"} onClick={() => signOut()}>
            Logout
          </button>
        </>
      ) : (
        <>
          {/*when logged out -> allow log in via different providers*/}
          <button className={"btn btn-primary"} onClick={() => signIn()}>
            Login with <FaDiscord className={"ml-2 text-2xl"} />
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
