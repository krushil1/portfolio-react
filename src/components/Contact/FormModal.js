import React from "react";

function FormModal({ isOpen, message, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default FormModal;
