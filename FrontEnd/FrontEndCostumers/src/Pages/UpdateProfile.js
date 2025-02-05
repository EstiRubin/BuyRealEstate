import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUserData, updateUserProfile } from "../api/apiService"; // ייבוא הקריאות ל-API
import "../CSS/UpdateProfile.css";
import Header from "./Header";

const initialState = {
  id: 0,
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  firstPhone: "",
  secendPhon: "",
  permissionId: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.payload };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userData, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const storedUserId = localStorage.getItem("id");
  const id = location.state?.id || storedUserId;

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("📢 טוען נתוני משתמש עבור ID:", id);
        const data = await fetchUserData(id);
        dispatch({ type: "SET_USER_DATA", payload: data });
      } catch (error) {
        setMessage("שגיאה בטעינת נתוני המשתמש.");
      }
    };
    getUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const validateInput = () => {
    const validations = [
      { condition: !userData.username, message: "שם משתמש הוא שדה חובה" },
      { condition: userData.username.length < 3 || !/^[א-תa-zA-Z]+$/.test(userData.username), message: "שם המשתמש חייב להיות באורך מינימלי של 3 תווים ולכלול רק אותיות בשפה אחת" },
      { condition: !userData.firstName || userData.firstName.length < 2 || !/^[א-תa-zA-Z]+$/.test(userData.firstName), message: "שם פרטי חייב להיות באורך מינימלי של 2 תווים ולכלול רק אותיות בשפה אחת" },
      { condition: !userData.lastName || userData.lastName.length < 2 || !/^[א-תa-zA-Z]+$/.test(userData.lastName), message: "שם משפחה חייב להיות באורך מינימלי של 2 תווים ולכלול רק אותיות בשפה אחת" },
      { condition: !userData.email || !userData.email.includes("@"), message: "כתובת המייל אינה תקינה" },
      { condition: userData.firstPhone && (!/^\d+$/.test(userData.firstPhone) || userData.firstPhone.length < 7 || userData.firstPhone.length > 15), message: "מספר טלפון 1 חייב להיות בין 7 ל-15 ספרות" },
      { condition: userData.secendPhon && (!/^\d+$/.test(userData.secendPhon) || userData.secendPhon.length < 7 || userData.secendPhon.length > 15), message: "מספר טלפון 2 חייב להיות בין 7 ל-15 ספרות" },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        setMessage(validation.message);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
  
    console.log("📢 שולח נתוני משתמש לעדכון:", userData); // הצגת הנתונים שנשלחים
  
    try {
      const successMessage = await updateUserProfile(id, userData);
      const successAlert = "הפרופיל עודכן בהצלחה! 🎉";
      setMessage(successAlert); // שמירת ההודעה המוצלחת
      window.alert(successAlert); // הצגת ההודעה למשתמש
    } catch (error) {
      let errorMessage = "אופס, משהו השתבש!";
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = `נראה ש... ${Object.values(error.response.data.errors)[0][0]}`;
      } else {
        errorMessage = error.message || "הייתה שגיאה לא צפויה. תנסה שוב מאוחר יותר.";
      }
  
      setMessage(errorMessage);
      window.alert(errorMessage);
    }
  };
  
  


  return (
    <div dir="rtl" className="container">
      <Header />
      {message && <div className="message">{message}</div>}
      <h2>עדכון פרופיל</h2>
      <form onSubmit={handleSubmit}>
        {["username", "firstName", "lastName", "email", "firstPhone", "secendPhon"].map((field) => (
          <div key={field}>
            <label>
              {field === "secendPhon"
                ? "מספר טלפון 2"
                : field === "firstPhone"
                ? "מספר טלפון 1"
                : field === "firstName"
                ? "שם פרטי"
                : field === "lastName"
                ? "שם משפחה"
                : field === "email"
                ? "כתובת מייל"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input type="text" name={field} value={userData[field] || ""} onChange={handleChange} />
          </div>
        ))}
        <button type="submit">עדכון פרופיל</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
