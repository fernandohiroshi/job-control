"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

// Header component
export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="flex items-center bg-slate-950 shadow-sm px-4 py-4 w-full h-20">
      <div className="flex justify-between items-center mx-auto w-full max-w-7xl">
        <Link href="/">
          <h1 className="font-bold text-white text-xl md:text-2xl uppercase hover:tracking-widest duration-300 ease-in-out">
            <span className="text-red">Job</span> Control
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin" aria-label="Loading">
            <FiLoader size={26} color="gray" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin} title="Login">
            <FiLock size={26} color="gray" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link
              href="/dashboard"
              title="Dashboard"
              className="hover:scale-125 duration-300 ease-in-out"
            >
              <FiUser size={26} color="white" />
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="hover:scale-125 duration-300 ease-in-out"
            >
              <FiLogOut size={26} color="white" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
