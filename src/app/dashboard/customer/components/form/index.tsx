"use client";

// Importing React Hook Form for form management
import { useForm } from "react-hook-form";

// Importing Zod for schema validation and resolver for React Hook Form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Importing custom Input component and API helper
import { Input } from "@/components/input";
import { api } from "@/lib/api";

// Importing useRouter for navigation
import { useRouter } from "next/navigation";

// Validation schema for the form
const schema = z.object({
  name: z.string().min(1, "The name field is required."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .min(1, "Email is mandatory."),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "The telephone number must be (DD) 999999999",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

// NewCustomerForm component: form to add a new customer
export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  // Handles form submission and customer registration
  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId,
    });

    router.replace("/dashboard/customer");
    router.refresh();
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 font-medium text-lg">Full Name</label>
      <Input
        type="text"
        name="name"
        placeholder="Client name"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex sm:flex-row flex-col gap-2 my-2">
        <div className="flex-1">
          <label className="mb-1 font-medium text-lg">Phone</label>
          <Input
            type="number"
            name="phone"
            placeholder="(xx) x xxxx xxxx"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 font-medium text-lg">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Client e-mail"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>
      <label className="mb-1 font-medium text-lg">Address</label>
      <Input
        type="text"
        name="address"
        placeholder="Client address"
        error={errors.address?.message}
        register={register}
      />

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue/80 hover:bg-blue my-4 px-2 rounded h-10 font-semibold text-white tracking-wider duration-300 ease-in-out"
      >
        Register
      </button>
    </form>
  );
}
