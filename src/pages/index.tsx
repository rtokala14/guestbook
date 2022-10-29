import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main>
      <h1>Guestbook</h1>

      <button onClick={() => signIn("discord")}>Login with Discord</button>
      <button onClick={() => signIn("google")}>Login with Google</button>
    </main>
  );
};

export default Home