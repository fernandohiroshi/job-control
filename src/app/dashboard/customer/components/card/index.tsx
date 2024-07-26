"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function CardCustumer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className="flex flex-col bg-slate-600 border-2 border-slate-200 p-2 rounded-lg gap-2 hover:bg-slate-500 duration-500 ease-in-out text-sm">
      <h2>
        <span className="font-semibold">Name:</span> {customer.name}
      </h2>

      <p>
        <span className="font-semibold">Email:</span> {customer.email}
      </p>

      <p>
        <span className="font-semibold">Phone:</span> {customer.phone}
      </p>

      <button
        onClick={handleDeleteCustomer}
        className="bg-red px-4 py-1 tracking-wide rounded text-white mt-2 self-start cursor-pointer hover:bg-red/80 duration-300 ease-in-out"
      >
        Delete
      </button>
    </article>
  );
}
