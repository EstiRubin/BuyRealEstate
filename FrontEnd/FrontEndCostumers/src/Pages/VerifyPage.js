import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyCode } from "../api/apiService"; // ייבוא הקריאה ל-API

const VerificationPage = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const storedUserId = localStorage.getItem("username");
  const username = location.state?.userId || storedUserId;

  const handleVerification = async (e) => {
    e.preventDefault();

    console.log("📢 שולח קוד אימות:", { username, code });

    try {
      const response = await verifyCode(username, code);

      console.log("✅ תגובת שרת:", response.data);

      if (response.status === 200) {
        navigate("/MainListPlots"); // נווט לעמוד הראשי
      } else {
        setMessage("קוד שגוי, נסה שוב.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "קוד שגוי, נסה שוב.");
    }
  };

  return (
    <div dir="rtl">
      <h1>קוד אימות נשלח אליך כרגע למייל</h1>
      <b>הקוד תקף ל-10 דקות בלבד</b>
      <h2>אנא הכנס קוד אימות</h2>
      <form onSubmit={handleVerification}>
        <input
          type="text"
          placeholder="קוד אימות"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          אשר
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerificationPage;
