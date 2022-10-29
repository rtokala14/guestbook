import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Messages = () => {
  const {
    data: messages,
    isLoading
  } = trpc.guestbook.getAll.useQuery()

  if (isLoading) return <div>Fetching message...</div>

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>-- {msg.name}</span>
          </div>
        )
      })}
    </div>
  )
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Guestbook</h1>
      <div className="pt-10">
      <div>

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
      <div className="pt-10">
        <Messages />
      </div>
      </div>
      </div>

    </main>
  );
};

export default Home