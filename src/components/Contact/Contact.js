import React, { useState } from "react";
import "./Contact.css";
import FormModal from "./FormModal"; // Import the Modal component

function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      content: `
        **Email:** ${formData.email}
        **Subject:** ${formData.subject}
        **Message:** ${formData.message}
      `,
    };

    try {
      const response = await fetch(
        "https://discord.com/api/webhooks/1162597278364733502/3I-UcyZkUM8sk-n7xdnylThwlWeS2-cjeI815hRq8SDW7fC9gsA19v9CdUsV14iAjaCF",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setModalMessage("Message sent successfully!");
        setIsModalOpen(true);
        setFormData({
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setModalMessage("Failed to send message. Please try again later.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setModalMessage("An error occurred. Please try again later.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`${
        isModalOpen ? "filter blur-md" : "" // Apply blur when the modal is open
      } sm:flex justify-center items-center min-h-screen bg-white-100 px-6 md:px-24 py-20`}
      id="contact"
    >
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-semibold text-orange text-center">
          Get in touch!
        </h2>
        <div>
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow-effect bg-gray-50 text-gray text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="shadow-effect bg-gray-50 text-gray text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="shadow-effect bg-gray-50 text-gray text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="transition ease-in-out delay-150 hover:scale-110 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange sm:w-fit"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FormModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}

export default Contact;
