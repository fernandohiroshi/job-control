"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";

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

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

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
    <div className="w-full mx-auto max-w-2xl px-4 rounded-xl">
      <h1 className="font-semibold text-3xl text-center py-2 mt-24 animate-pulse">
        Create task
      </h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="flex justify-between items-center px-4 mb-4 bg-slate-200 text-black rounded ">
            <p className="text-lg">
              <span className="font-semibold">Selected client: </span>
              {customer.name}
            </p>
            <button
              className="text-red hover:scale-125 ease-in-out duration-300 h-11 px-2 flex justify-center items-center rounded-full"
              onClick={handleClearCustomer}
            >
              <FiX size={30} />
            </button>
          </div>
        ) : (
          <form
            className="py-4 px-2 bg-white/20 rounded-xl"
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
                className="w-full h-11 flex items-center justify-center gap-2 px-4 rounded-md text-white bg-blue/80 hover:bg-blue ease-in-out duration-200 font-semibold tracking-wide hover:tracking-widest"
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
