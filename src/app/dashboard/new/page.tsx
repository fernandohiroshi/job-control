import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // Server Action
  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "OPEN",
        userId: session?.user.id,
      },
    });
    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-red/80 hover:bg-red px-4 py-1 text-white rounded ease-in-out duration-300 font-semibold tracking-wider"
          >
            Cancel
          </Link>
          <h1 className="text-3xl font-semibold">New Task</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Task Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter the task name"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-11 text-black"
          />

          <label className="mb-1 font-medium text-lg">Description</label>
          <textarea
            name="description"
            placeholder="Task description"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none text-black"
          >
            {" "}
          </textarea>

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Select the client
              </label>
              <select
                name="customer"
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white cursor-pointer text-black"
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
              className="hover:underline duration-300 ease-in-out animate-pulse hover:animate-none"
            >
              You don't have a client, register by{" "}
              <span className="text-blue-600 font-medium">clicking here!</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={customers.length === 0}
            className="bg-blue/80 hover:bg-blue my-4 px-2 h-10 text-white font-semibold rounded tracking-wider ease-in-out duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Register
          </button>
        </form>
      </main>
    </Container>
  );
}
