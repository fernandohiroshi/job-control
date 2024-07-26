import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

import { Container } from "@/components/container";
import { CardCustumer } from "./components/card";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold uppercase">Clients</h1>
          <Link
            href="/dashboard/customer/new"
            className="px-4 py-1 rounded text-white bg-purple hover:bg-purple/80 ease-in-out duration-200 font-semibold tracking-wide"
          >
            New Client
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
          {customers.map((customer) => (
            <CardCustumer key={customer.id} customer={customer} />
          ))}
        </section>
        {customers.length === 0 && (
          <h1 className="animate-pulse text-lg tracking-wider">
            You have no registered clients...
          </h1>
        )}
      </main>
    </Container>
  );
}
