"use client";

// External libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrSend } from "react-icons/gr";

// Internal components and utilities
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";

// Validation schema for the form
const schema = z.object({
  name: z.string().min(1, "Task name is required..."),
  description: z.string().min(1, "Describe the task to submit..."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

// Ticket submission form component
export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handler for form submission
  async function handleRegisterTicket(data: FormData) {
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    // Clear form fields
    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="flex flex-col gap-2 bg-white/20 mt-6 px-4 py-6 rounded"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <div>
        <label className="mb-1 font-semibold text-lg">Task Name</label>
        <Input
          register={register}
          type="text"
          placeholder="Enter the name of your task..."
          name="name"
        />
        {errors.name?.message && (
          <p className="mt-2 text-red tracking-widest">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div>
        <label className="font-semibold text-lg">Description</label>
        <textarea
          className="p-2 rounded w-full h-24 text-black resize-none"
          placeholder="Describe your task..."
          id="description"
          {...register("description")}
        ></textarea>

        {errors.description?.message && (
          <p className="mb-4 text-red tracking-widest">
            {errors.description?.message}
          </p>
        )}

        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-blue/80 hover:bg-blue px-4 rounded-md w-full h-11 font-semibold text-white tracking-wide hover:tracking-widest duration-200 ease-in-out"
        >
          Send task <GrSend />
        </button>
      </div>
    </form>
  );
}
