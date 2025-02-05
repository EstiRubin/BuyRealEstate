import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://localhost:7219/api";

// פונקציות GET, POST, PUT כללים
const fetchData = async (url, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers: { "Content-Type": "application/json" },
      data,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request to ${url}:`, error);
    throw error;
  }
};

// דוגמאות לקריאות ספציפיות

export const fetchUserData = (id) => fetchData(`/user/${id}`);

export const updateUserProfile = (id, userData) => fetchData(`/user/${id}`, 'PUT', userData);

export const loginUser = (username, password) => fetchData('/user/login', 'POST', { username, password });

export const getGuarantees = () => fetchData('/Guarantees');

export const getPayments = () => fetchData('/Payment');

// קריאות עם פרמטרים
export const fetchUserPlots = (userId) => fetchData(`/plot/userplot/${userId}`);

export const fetchPlotById = (id) => fetchData(`/plot/${id}`);

export const fetchImagesForProject = (projectId) => fetchData(`/Images/project/${projectId}`);

export const fetchFilesForProject = (projectId, isRecipe) =>
  fetchData(`/Document/${projectId}?isRecipe=${encodeURIComponent(isRecipe)}`);
  
export const sendContactForm = (formData) => fetchData('/contact', 'POST', formData);

export const verifyCode = (username, code) => fetchData('/Verification/VerifyCode', 'POST', { username, code });

// פונקציה לבדוק אם יש User Authenticated (אם צריך להוסיף Token)
export const getAuthHeader = () => {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
