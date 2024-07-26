"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function Refresh() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.refresh()}
      className="bg-dark hover:bg-dark/80 px-3 py-1 rounded duration-300 ease-in-out"
      title="Refresh"
    >
      <FiRefreshCcw size={24} />
    </button>
  );
}
