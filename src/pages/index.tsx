import { type NextPage } from "next";
import Link from "next/link";
import { Login } from "../components/Login";

const Home: NextPage = () => {
  return (
    <div className={"flex flex-col items-center justify-center [&>*]:m-1"}>
      {/*view bucket lists of all users*/}
      <Link href={"/viewBucketLists"}>
        <button className={"btn-secondary btn"}>View bucket lists</button>
      </Link>

      <Login />
    </div>
  );
};

export default Home;
