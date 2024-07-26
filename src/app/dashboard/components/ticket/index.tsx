"use client";

import { useContext } from "react";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiFile, FiTrash2 } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-[1px] border-slate-600 h-16 last:border-b-0 hover:bg-slate-600 duration-200 ease-in-out">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden md:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-yellow px-3 py-1 rounded text-black font-semibold tracking-wider">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button
            onClick={handleChangeStatus}
            className="mr-4 hover:scale-125 ease-in-out duration-300"
            title="Delete Task"
          >
            <FiTrash2 size={24} color="tomato" />
          </button>
          <button
            onClick={handleOpenModal}
            title="Task Detail"
            className="hover:scale-125 ease-in-out duration-300"
          >
            <FiFile size={24} color="white" />
          </button>
        </td>
      </tr>
    </>
  );
}
