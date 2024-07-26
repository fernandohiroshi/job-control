import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";
import { Refresh } from "./components/refresh";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold uppercase">Task List</h1>
          <div className="flex items-center gap-4">
            <Refresh />
            <Link
              href="/dashboard/new"
              className="px-4 py-1 rounded text-white bg-purple hover:bg-purple/80 ease-in-out duration-200 font-semibold tracking-wide"
            >
              New Task
            </Link>
          </div>
        </div>

        <table className="min-w-full my-4">
          <thead>
            <tr>
              <th className="font-medium uppercase text-left pl-1">Client</th>
              <th className="font-medium uppercase text-left hidden md:block">
                Date
              </th>
              <th className="font-medium uppercase text-left">Status</th>
              <th className="font-medium uppercase text-left">Details</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                customer={ticket.customer}
                ticket={ticket}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="px-2 animate-pulse text-lg tracking-wider">
            No tasks were found...
          </h1>
        )}
      </main>
    </Container>
  );
}
