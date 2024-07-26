"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { GrSend } from "react-icons/gr";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "Task name is required..."),
  description: z.string().min(1, "Describe the task to submit..."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="mt-6 px-4 py-6 bg-white/20 rounded flex flex-col gap-2"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <div>
        <label className="mb-1 font-semibold text-lg"> Task Name</label>
        <Input
          register={register}
          type="text"
          placeholder="Enter the name of your task..."
          name="name"
        />
        {errors.name?.message && (
          <p className="text-red mt-2 tracking-widest">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div>
        <label className="font-semibold text-lg"> Task Name</label>
        <textarea
          className="w-full rounded h-24 resize-none p-2 text-black"
          placeholder="Describe your task..."
          id="description"
          {...register("description")}
        ></textarea>

        {errors.description?.message && (
          <p className="text-red mb-4 tracking-widest">
            {errors.description?.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full h-11 flex items-center justify-center gap-2 px-4 rounded-md text-white bg-blue/80 hover:bg-blue ease-in-out duration-200 font-semibold tracking-wide hover:tracking-widest"
        >
          Send task <GrSend />
        </button>
      </div>
    </form>
  );
}
