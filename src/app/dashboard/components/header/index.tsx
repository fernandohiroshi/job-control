import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full text-white my-8 rounded flex gap-4 items-center px-2">
        <Link
          className="px-4 py-1 rounded text-white bg-blue hover:bg-blue/80 ease-in-out duration-200 font-semibold tracking-wide"
          href="/dashboard"
        >
          Tasks
        </Link>
        <Link
          className="px-4 py-1 rounded text-white bg-blue hover:bg-blue/80 ease-in-out duration-200 font-semibold tracking-wide"
          href="/dashboard/customer"
        >
          Clients
        </Link>
      </header>
    </Container>
  );
}
