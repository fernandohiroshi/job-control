"use client";

import { MouseEvent, useContext, useRef } from "react";
import { ModalContext } from "@/providers/modal";

export function ModalTicket() {
  // Get modal control functions and ticket data from context
  const { handleModalVisible, ticket } = useContext(ModalContext);
  // Reference for the modal container
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside the modal to close it
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <section
      className="absolute bg-black/60 w-full min-h-screen"
      onClick={handleModalClick} // Click outside closes the modal
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          ref={modalRef} // Reference for click detection
          className="bg-slate-100 shadow-lg p-3 rounded-xl w-4/5 md:w-1/2 max-w-2xl text-black"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-lg md:text-2xl">Task details</h1>
            <button
              className="bg-red/80 hover:bg-red px-4 py-1 rounded font-semibold text-white tracking-wider duration-300 ease-in-out"
              onClick={handleModalVisible} // Close button
            >
              Close
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-semibold">Name:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-col flex-wrap gap-1">
            <h2 className="font-semibold">Description:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="border-gray-400 my-4 border-t-[1px] w-full" />
          <h1 className="mb-4 font-semibold text-lg">Client details</h1>

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
