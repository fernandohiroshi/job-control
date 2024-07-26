"use client";

// Import React hooks and types
import { createContext, ReactNode, useState } from "react";

// Import custom types
import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";

// Import the ModalTicket component
import { ModalTicket } from "@/components/modal";

// Define the shape of the context data
interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (detail: TicketInfo) => void;
}

// Define the shape of the ticket and customer details
interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

// Create the context with a default value
export const ModalContext = createContext({} as ModalContextData);

// Define the provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  // Toggle the visibility of the modal
  function handleModalVisible() {
    setVisible(!visible);
  }

  // Set the details for the ticket
  function setDetailTicket(detail: TicketInfo) {
    setTicket(detail);
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailTicket }}
    >
      {/* Render the ModalTicket component if the modal is visible */}
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
