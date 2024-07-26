// Import necessary modules from Next.js and Prisma
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// Handle PATCH requests to update a ticket's status
export async function PATCH(request: Request) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // Extract ticket ID from request body
  const { id } = await request.json();

  // Find the ticket by ID
  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  // Return error if ticket is not found
  if (!findTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  try {
    // Update ticket status to "CLOSED"
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "CLOSED",
      },
    });

    return NextResponse.json({
      message: "Task updated successfully",
    });
  } catch (err) {
    // Return error if update fails
    return NextResponse.json(
      { error: "Failed update ticket" },
      { status: 400 }
    );
  }
}

// Handle POST requests to create a new ticket
export async function POST(request: Request) {
  // Extract ticket details from request body
  const { customerId, name, description } = await request.json();

  // Return error if any required fields are missing
  if (!customerId || !name || !description) {
    return NextResponse.json(
      { error: "Failed create new ticket" },
      { status: 400 }
    );
  }

  try {
    // Create a new ticket in the database
    await prismaClient.ticket.create({
      data: {
        name,
        description,
        status: "OPEN",
        customerId,
      },
    });

    return NextResponse.json({ message: "Task registered!" });
  } catch (err) {
    // Return error if creation fails
    return NextResponse.json(
      { error: "Failed create new ticket" },
      { status: 400 }
    );
  }
}
