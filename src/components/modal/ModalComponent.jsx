import React from "react";
import "./Modal.css";

/**
 * ModalComponent is a reusable modal for displaying content.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed within the modal.
 * @param {function} props.setOpen - Function to control the modal's open state.
 * @param {boolean} props.open - The current open state of the modal.
 * @returns {JSX.Element} - The JSX for the ModalComponent.
 */
const ModalComponent = ({ children, setOpen, open }) => {
  /**
   * Handles the click event on the modal.
   * Toggles the modal's open state.
   * @param {React.MouseEvent} e - The click event.
   */
  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevents the click event from reaching parent elements
    setOpen(!open); // Toggles the open state of the modal
  };

  /**
   * Handles the click event on the modal content.
   * Stops the propagation of the click event to prevent the modal from closing.
   * @param {React.MouseEvent} e - The click event.
   */
  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevents the click event from reaching parent elements
  };

  return (
    <div
      className={`youtube-modal ${open ? "open" : ""}`}
      onClick={handleModalClick}
    >
      <div
        className="modal-content bg-dark p-0 p-md-2"
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
