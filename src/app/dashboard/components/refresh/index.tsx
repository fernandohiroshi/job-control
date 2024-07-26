"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function Refresh() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.refresh()}
      className="duration-300 ease-in-out bg-dark px-3 py-1 rounded hover:bg-dark/80"
      title="Refresh"
    >
      <FiRefreshCcw size={24} />
    </button>
  );
}
