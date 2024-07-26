// Internal components
import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// External libraries
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

// Page component for creating a new ticket
export default async function NewTicket() {
  // Fetches the current session from authentication
  const session = await getServerSession(authOptions);

  // Redirect to home if user is not authenticated
  if (!session || !session.user) {
    redirect("/");
  }

  // Fetch customers associated with the authenticated user
  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // Server Action for registering a new ticket
  async function handleRegisterTicket(formData: FormData) {
    "use server"; // Mark function for server execution

    // Extract form data
    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    // Check if all required fields are present
    if (!name || !description || !customerId) {
      return;
    }

    // Create new ticket in the database
    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "OPEN",
        userId: session?.user.id,
      },
    });
    // Redirect to dashboard after creation
    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-red/80 hover:bg-red px-4 py-1 rounded font-semibold text-white tracking-wider duration-300 ease-in-out"
          >
            Cancel
          </Link>
          <h1 className="font-semibold text-3xl">New Task</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Task Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter the task name"
            required
            className="border-2 mb-2 px-2 rounded-md w-full h-11 text-black"
          />

          <label className="mb-1 font-medium text-lg">Description</label>
          <textarea
            name="description"
            placeholder="Task description"
            required
            className="border-2 mb-2 px-2 rounded-md w-full h-24 text-black resize-none"
          />

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Select the client
              </label>
              <select
                name="customer"
                className="border-2 bg-white mb-2 px-2 rounded-md w-full h-11 text-black cursor-pointer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {customers.length === 0 && (
            <Link
              href="/dashboard/customer/new"
              className="hover:underline animate-pulse hover:animate-none duration-300 ease-in-out"
            >
              You don't have a client, register by{" "}
              <span className="font-medium text-blue-600">clicking here!</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={customers.length === 0}
            className="bg-blue/80 hover:bg-blue disabled:bg-gray-400 my-4 px-2 rounded h-10 font-semibold text-white tracking-wider duration-300 disabled:cursor-not-allowed ease-in-out"
          >
            Register
          </button>
        </form>
      </main>
    </Container>
  );
}
