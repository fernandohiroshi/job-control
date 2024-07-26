// External libraries
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";

// Internal utilities
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// Internal components
import { Container } from "@/components/container";
import { CardCustumer } from "./components/card";

// Page component for displaying customers
export default async function Customer() {
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

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-semibold text-xl uppercase">Clients</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-purple hover:bg-purple/80 px-4 py-1 rounded font-semibold text-white tracking-wide duration-200 ease-in-out"
          >
            New Client
          </Link>
        </div>

        <section className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {customers.map((customer) => (
            <CardCustumer key={customer.id} customer={customer} />
          ))}
        </section>
        {customers.length === 0 && (
          <h1 className="text-lg tracking-wider animate-pulse">
            You have no registered clients...
          </h1>
        )}
      </main>
    </Container>
  );
}
