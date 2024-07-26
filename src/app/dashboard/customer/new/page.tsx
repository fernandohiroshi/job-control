import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { NewCustomerForm } from "../components/form";

export default async function NewCustumer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer"
            className="bg-red/80 hover:bg-red px-4 py-1 text-white rounded ease-in-out duration-300 font-semibold tracking-wider"
          >
            Cancel
          </Link>
          <h1 className="text-3xl font-semibold">New client</h1>
        </div>

        <NewCustomerForm userId={session.user.id} />
      </main>
    </Container>
  );
}
