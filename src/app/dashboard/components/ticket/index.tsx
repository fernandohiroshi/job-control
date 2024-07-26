"use client";

// Importing necessary hooks and modules
import { useContext } from "react";
import { useRouter } from "next/navigation";

// Importing icons from react-icons
import { FiFile, FiTrash2 } from "react-icons/fi";

// Importing custom types
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";

// Importing API helper
import { api } from "@/lib/api";

// Importing ModalContext
import { ModalContext } from "@/providers/modal";

// Props interface for TicketItem
interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

// TicketItem component: renders a table row with ticket information and actions.
export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  // Function to change the ticket status
  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", { id: ticket.id });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  // Function to open the modal with ticket details
  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({ customer, ticket });
  }

  return (
    <>
      <tr className="border-slate-600 hover:bg-slate-600 border-b-[1px] last:border-b-0 h-16 duration-200 ease-in-out">
        <td className="pl-1 text-left">{customer?.name}</td>
        <td className="hidden text-left md:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-yellow px-3 py-1 rounded font-semibold text-black tracking-wider">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          {/* Button to change the status */}
          <button
            onClick={handleChangeStatus}
            className="mr-4 hover:scale-125 duration-300 ease-in-out"
            title="Delete Task"
          >
            <FiTrash2 size={24} color="tomato" />
          </button>
          {/* Button to open ticket details */}
          <button
            onClick={handleOpenModal}
            title="Task Detail"
            className="hover:scale-125 duration-300 ease-in-out"
          >
            <FiFile size={24} color="white" />
          </button>
        </td>
      </tr>
    </>
  );
}
