"use client";

// Importing custom type for customer properties
import { CustomerProps } from "@/utils/customer.type";

// Importing API helper
import { api } from "@/lib/api";

// Importing useRouter hook from Next.js for navigation actions
import { useRouter } from "next/navigation";

// CardCustomer component: displays customer information with a delete button.
export function CardCustumer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  // Function to handle deleting a customer
  async function handleDeleteCustomer() {
    try {
      await api.delete("/api/customer", {
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
    <article className="flex flex-col gap-2 border-2 border-slate-200 bg-slate-600 hover:bg-slate-500 p-2 rounded-lg text-sm duration-500 ease-in-out">
      <h2>
        <span className="font-semibold">Name:</span> {customer.name}
      </h2>

      <p>
        <span className="font-semibold">Email:</span> {customer.email}
      </p>

      <p>
        <span className="font-semibold">Phone:</span> {customer.phone}
      </p>

      {/* Button to delete the customer */}
      <button
        onClick={handleDeleteCustomer}
        className="bg-red hover:bg-red/80 mt-2 px-4 py-1 rounded text-white tracking-wide duration-300 cursor-pointer ease-in-out self-start"
      >
        Delete
      </button>
    </article>
  );
}
