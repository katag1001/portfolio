import React, { useState } from "react";
import "./emailForm.css";

function EmailForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mlgdqejq", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Message sent! Thank you.");
        form.reset();
      } else {
        setStatus("Oops! Something went wrong.");
      }
    } catch (err) {
      setStatus("Oops! Something went wrong.");
    }
  };

  return (
    <div className="contact_section">
      <div className="contact_container">
        <h2>Contact Me</h2>
        <form className="contact_form" onSubmit={handleSubmit}>
          <label>
            Your email:
            <input type="email" name="email" required />
          </label>
          <label>
            Your message:
            <textarea name="message" required></textarea>
          </label>
          <button type="submit">Send</button>
        </form>
        {status && <p className="form_status">{status}</p>}
      </div>
    </div>
  );
}

export default EmailForm;
