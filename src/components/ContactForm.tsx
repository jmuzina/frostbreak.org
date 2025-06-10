import React, { useState } from "react";
import { toast } from "react-toastify";

// todo fix this condition, find a way to build env vars into astro somehow. Currently node env is undefined no matter what i do.
const CONTACT_SERVICE_ADDRESS = "https://fox-den.frostbreak.org/contact/send";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsValid(formRef?.current?.checkValidity() || false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(CONTACT_SERVICE_ADDRESS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();

      if (response.ok) {
        toast.success(result || "Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(
          result || "Failed to send message. Please check your input.",
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      if (error instanceof Error) {
        toast.error(
          `An error occurred: ${error.message}. Please try again later.`,
        );
      } else {
        toast.error("An unknown error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form contact" onSubmit={handleSubmit} ref={formRef}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        autoComplete="name"
        placeholder="Your Name"
        disabled={loading}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        placeholder="you@example.com"
        required
        disabled={loading}
      />

      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        autoComplete="on"
        placeholder="Subject of your message"
        required
        disabled={loading}
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        minLength={10}
        maxLength={2000}
        placeholder="Your message here..."
        required
        disabled={loading}
      ></textarea>

      <button
        type="submit"
        className="button primary submit"
        disabled={loading || !isValid}
      >
        {loading ? (
          <span>
            Submitting...
            <i className="icon loading-spinner" />
          </span>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

export default ContactForm;
