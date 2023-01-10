import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaDiscord } from "react-icons/fa";

const Home: NextPage = () => {

  const { data: session, status } = useSession();

  console.log(status);

  return (
    <>
      <Head>
        <title>Path to Happiness</title>
        <meta name="description" content="View the wishes of the world to become happy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={"flex flex-col items-center w-full"}>
        <Header />

        {/*content*/}
        <div className={"flex flex-col items-center [&>*]:m-1"}>
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

        <Footer />
      </div>
    </>
  );
};

export default Home;
