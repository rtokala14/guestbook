import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>
  }

  return (
    <main>
      <h1>Guestbook</h1>
      {session ? (
        <div>
          <p>
            hi {session.user?.name}
          </p>

          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn("discord")}>Login with Discord</button>
          <button onClick={() => signIn("google")}>Login with Google</button>
        </div>
      )}

    </main>
  );
};

export default Home