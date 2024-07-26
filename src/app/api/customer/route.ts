// Import necessary modules from Next.js and Prisma
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma";

// Handle GET requests to find a customer by email
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  // Return error if email is not provided
  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Client not found" }, { status: 400 });
  }

  try {
    // Query the database for the customer
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json(customer);
  } catch (err) {
    // Return error if database query fails
    return NextResponse.json({ error: "Client not found" }, { status: 400 });
  }
}

// Handle DELETE requests to delete a customer
export async function DELETE(request: Request) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  // Return error if user ID is not provided
  if (!userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  try {
    // Delete the customer from the database
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (err) {
    console.log(err);
    // Return error if deletion fails
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 400 }
    );
  }
}

// Handle POST requests to register a new customer
export async function POST(request: Request) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // Extract customer data from request body
  const { name, email, phone, address, userId } = await request.json();

  try {
    // Create a new customer in the database
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Customer successfully registered!" });
  } catch (err) {
    // Return error if customer creation fails
    return NextResponse.json(
      { error: "Failed create new customer" },
      { status: 400 }
    );
  }
}
