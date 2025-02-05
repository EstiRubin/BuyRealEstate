import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendContactForm } from "../../api/apiService"; // מיובא מהקובץ apiService
import Header from "../Header";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "שם הוא שדה חובה";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      newErrors.email = "אימייל לא תקין";
    }

    const phoneRegex = /^\d{9,10}$/;
    if (!phone.match(phoneRegex)) {
      newErrors.phone = "מספר טלפון חייב להכיל 9-10 ספרות";
    }
    
    const messageRegex = /^[a-zA-Zא-ת0-9\s]+$/; // רק אותיות בעברית, אנגלית ומספרים
    const forbiddenCharsRegex = /[<>/&"'`]/; // תווים מסוכנים שיש למנוע
    
    if (message.trim().length < 10) {
      newErrors.message = "הודעה חייבת להכיל לפחות 10 תווים";
    } else if (!message.match(messageRegex)) {
      newErrors.message = "ההודעה יכולה להכיל רק אותיות ומספרים ללא סימנים מיוחדים";
    } else if (forbiddenCharsRegex.test(message)) {
      newErrors.message = "ההודעה מכילה תווים אסורים";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const htmlMessage = `
<html dir="rtl">
  <head>
    <style>
      body { font-family: Arial, sans-serif; direction: rtl; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; text-align: right; }
      .header { background-color: #4CAF50; color: white; text-align: center; padding: 10px; }
      .section { margin-top: 20px; }
      .label { font-weight: bold; }
      .message { padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; text-align: right; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>הודעה חדשה מצור קשר</h2>
      </div>
      <div class="section">
        <p><span class="label">שם:</span> ${name}</p>
        <p><span class="label">:אימייל</span> ${email}</p>
        <p><span class="label">טלפון:</span> ${phone}</p>
        <p><span class="label">:הודעה</span></p>
        <div class="message">${message}</div>
      </div>
    </div>
  </body>
</html>
    `;

    try {
      await sendContactForm({
        recipientEmail: "liknotnalan@gmail.com",
        subject: "הודעה חדשה מצור קשר",
        message: htmlMessage,
      });
      navigate("/ThankYou");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("הייתה בעיה בשליחת ההודעה, נסה שוב.");
    }
  };

  return (
    <div dir="rtl">
      <Header></Header>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">שם:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            placeholder="הכנס את שמך"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            placeholder="הכנס את האימייל שלך"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="phone">טלפון:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            placeholder="הכנס את הטלפון שלך"
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="message">הודעה:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "8px", height: "80px" }}
            placeholder="הכנס את ההודעה שלך"
          ></textarea>
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}
        >
          שליחה
        </button>
      </form>
    </div>
  );
};

export default Contact;
