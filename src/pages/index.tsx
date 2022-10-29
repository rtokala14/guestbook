import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useState } from "react";

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading) return <div>Fetching message...</div>;

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>-- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const postMessage = trpc.guestbook.postMessage.useMutation();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">Guestbook</h1>
      <div className="pt-10">
        <div>
          {session ? (
            <div>
              <p>hi {session.user?.name}</p>

              <button onClick={() => signOut()}>Logout</button>

              <div className="pt-6">
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();

                    postMessage.mutate({
                      name: session.user?.name as string,
                      message,
                    });

                    setMessage("");
                  }}
                >
                  <input
                    type="text"
                    value={message}
                    placeholder="Your message..."
                    minLength={2}
                    maxLength={100}
                    onChange={(event) => setMessage(event.target.value)}
                    className="rounded-md border-2 border-zinc-800 bg-neutral-700 px-4 py-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => signIn("discord")}>
                Login with Discord
              </button>
              <button onClick={() => signIn("google")}>
                Login with Google
              </button>
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

export default Home;
