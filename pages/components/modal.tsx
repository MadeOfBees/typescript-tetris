import { useState } from "react";
import ContactDetails from "./contactDetails"

export default function Modal(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <input
        type="checkbox"
        id="contactModal"
        className="modal-toggle"
        checked={isOpen}
        onChange={toggleModal}
      />
      <label htmlFor="contactModal" className="modal cursor-pointer">
        <div className="modal-box relative">
          <ContactDetails />
          <button onClick={toggleModal} className="absolute top-2 right-2">
            Close
          </button>
        </div>
      </label>
    </>
  );
}
