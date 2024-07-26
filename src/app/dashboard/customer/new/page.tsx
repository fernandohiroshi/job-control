// External libraries
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Internal utilities and components
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/container";
import { NewCustomerForm } from "../components/form";

// Page component for creating a new customer
export default async function NewCustumer() {
  // Fetches the current session from authentication
  const session = await getServerSession(authOptions);

  // Redirect to home if user is not authenticated
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer"
            className="bg-red/80 hover:bg-red px-4 py-1 rounded font-semibold text-white tracking-wider duration-300 ease-in-out"
          >
            Cancel
          </Link>
          <h1 className="font-semibold text-3xl">New client</h1>
        </div>

        <NewCustomerForm userId={session.user.id} />
      </main>
    </Container>
  );
}
