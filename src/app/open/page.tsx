"use client";

// External libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";

// Internal components and utilities
import { Input } from "@/components/input";
import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";

// Validation schema for the form
const schema = z.object({
  email: z
    .string()
    .email("Enter client email to locate.")
    .min(1, "The email field is required."),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Clears the selected customer
  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  // Searches for the customer based on email
  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", { type: "custom", message: "Client not found ..." });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="mx-auto px-4 rounded-xl w-full max-w-2xl">
      <h1 className="mt-24 py-2 font-semibold text-3xl text-center animate-pulse">
        Create task
      </h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="flex justify-between items-center bg-slate-200 mb-4 px-4 rounded text-black">
            <p className="text-lg">
              <span className="font-semibold">Selected client: </span>
              {customer.name}
            </p>
            <button
              className="text-red hover:scale-125 flex justify-center items-center px-2 rounded-full h-11 duration-300 ease-in-out"
              onClick={handleClearCustomer}
            >
              <FiX size={30} />
            </button>
          </div>
        ) : (
          <form
            className="bg-white/20 px-2 py-4 rounded-xl"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3 text-rose-500">
              <Input
                name="email"
                placeholder="Enter the client email"
                type="text"
                register={register}
              />
              {errors.email?.message && (
                <p className="text-red tracking-widest">
                  {errors.email?.message}
                </p>
              )}

              <button
                type="submit"
                className="flex justify-center items-center gap-2 bg-blue/80 hover:bg-blue px-4 rounded-md w-full h-11 font-semibold text-white tracking-wide hover:tracking-widest duration-200 ease-in-out"
              >
                Search for client <FiSearch />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket customer={customer} />}
      </main>
    </div>
  );
}
