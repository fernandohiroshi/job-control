"use client";

import { MouseEvent, useContext, useRef } from "react";
import { ModalContext } from "@/providers/modal";

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <section
      className="absolute bg-black/60 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-slate-100 text-black shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-semibold text-lg md:text-2xl">Task details</h1>
            <button
              className="bg-red/80 tracking-wider font-semibold hover:bg-red ease-in-out duration-300 text-white px-4 py-1 rounded"
              onClick={handleModalVisible}
            >
              Close
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-semibold">Name:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-wrap flex-col gap-1 ">
            <h2 className="font-semibold">Description:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full my-4 border-t-[1px] border-gray-400" />
          <h1 className="font-semibold text-lg mb-4">Client details</h1>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-semibold">Name:</h2>
            <p>{ticket?.customer?.name}</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-semibold">Phone:</h2>
            <p>{ticket?.customer?.phone}</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-semibold">Email:</h2>
            <p>{ticket?.customer?.email}</p>
          </div>

          {ticket?.customer?.address && (
            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-semibold">Address:</h2>
              <p>{ticket.customer.address}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
