// External libraries
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

// Internal components and utilities
import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { TicketItem } from "./components/ticket";
import { Refresh } from "./components/refresh";

// Main Dashboard component
export default async function DashBoard() {
  // Fetch user session
  const session = await getServerSession(authOptions);

  // Redirect if user is not authenticated
  if (!session || !session.user) {
    redirect("/");
  }

  // Fetch open tickets for the authenticated user
  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "OPEN",
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2 px-2">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-semibold text-xl uppercase">Task List</h1>
          <div className="flex items-center gap-4">
            {/* Refresh component */}
            <Refresh />
            {/* Link to create a new task */}
            <Link
              href="/dashboard/new"
              className="bg-purple hover:bg-purple/80 px-4 py-1 rounded font-semibold text-white tracking-wide duration-200 ease-in-out"
            >
              New Task
            </Link>
          </div>
        </div>

        {/* Table for displaying tickets */}
        <table className="my-4 min-w-full">
          <thead>
            <tr>
              <th className="pl-1 font-medium text-left uppercase">Client</th>
              <th className="md:block hidden font-medium text-left uppercase">
                Date
              </th>
              <th className="font-medium text-left uppercase">Status</th>
              <th className="font-medium text-left uppercase">Details</th>
            </tr>
          </thead>

          <tbody>
            {/* Render each ticket item */}
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                customer={ticket.customer}
                ticket={ticket}
              />
            ))}
          </tbody>
        </table>
        {/* Display message if no tickets found */}
        {tickets.length === 0 && (
          <h1 className="px-2 text-lg tracking-wider animate-pulse">
            No tasks were found...
          </h1>
        )}
      </main>
    </Container>
  );
}
