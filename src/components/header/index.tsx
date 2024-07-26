"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-4 py-4 bg-slate-950 h-20 shadow-sm">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="text-white font-bold text-xl md:text-2xl uppercase hover:tracking-widest ease-in-out duration-300">
            <span className="text-red">Job</span> Control
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
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
              className="hover:scale-125 ease-in-out duration-300"
            >
              <FiUser size={26} color="white" />
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="hover:scale-125 ease-in-out duration-300"
            >
              <FiLogOut size={26} color="white" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
