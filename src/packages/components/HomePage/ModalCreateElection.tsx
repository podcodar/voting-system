"use client";
import { addElection } from "@packages/DAO/elections.dao";
import { useState } from "react";
import CreateElection from "./CreateElection";

export default function ModalCreateElection() {
  const [isOpen, setIsOpen] = useState(false);

  const formAction = async (formData: FormData) => {
    setIsOpen(false);
    await addElection(formData);
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create Election
        </button>
      )}
      {isOpen && (
        <div className="flex justify-center items-center bg-opacity-90 top-0 left-0 z-100 fixed w-full h-full bg-gray-300">
          <div className="flex bg-white flex-col h-50 margin-auto rounded-md border-0">
            <button
              type="button"
              className="flex pr-4 pt-3 text-sm justify-end font-semibold text-gray-300 hover:text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              x
            </button>
            <div>
              <CreateElection onAction={formAction} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
