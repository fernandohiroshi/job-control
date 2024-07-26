import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <Container>
      <header className="flex items-center gap-4 my-8 px-2 rounded w-full text-white">
        <Link
          className="bg-blue hover:bg-blue/80 px-4 py-1 rounded font-semibold text-white tracking-wide duration-200 ease-in-out"
          href="/dashboard"
        >
          Tasks
        </Link>
        <Link
          className="bg-blue hover:bg-blue/80 px-4 py-1 rounded font-semibold text-white tracking-wide duration-200 ease-in-out"
          href="/dashboard/customer"
        >
          Clients
        </Link>
      </header>
    </Container>
  );
}
