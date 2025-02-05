import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Header from "./Header";
import FileListViewer from "../Pages/Document/Document";
import ImageList from "./Image/ImageList";
import CostDetails from "./PlotDetiels/costDetiels";
import Contact from "./PlotDetiels/Contact";
import Paymentsheet from "./PlotDetiels/Paymentsheet";
import DescriptionPlot from "./PlotDetiels/DescriptionPlot";
import ProgressUpdate from "./PlotDetiels/ProgressUpdate";
import Guarantees from "./PlotDetiels/Guarantees";
import { fetchPlotById } from "../api/apiService"; // קריאה ל-API
import "../CSS/PlotsPage.css";

function PlotsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [plot, setPlot] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlot = async () => {
      try {
        const data = await fetchPlotById(id);
        setPlot(data);
      } catch (err) {
        setError("לא הצלחנו לטעון את נתוני המגרש.");
        console.error(err);
      }
    };

    loadPlot();
  }, [id]);

  const tabComponents = {
    description: <DescriptionPlot plot={plot} />,
    updates: <ProgressUpdate />,
    receiptsInvoices: <FileListViewer projectId={plot?.project?.id} isRecipe={true} />,
    documents: <FileListViewer projectId={plot?.project?.id} isRecipe={false} />,
    paymentSheet: <Paymentsheet plot={plot} />,
    fieldPhotos: <ImageList projectId={plot?.project?.id} />,
    contact: <Contact />,
    costDetails: <CostDetails plot={plot} />,
    guarantees: <Guarantees />,
  };

  const renderContent = () => {
    if (!plot) return <p>טעינת נתוני המגרש...</p>;
    return tabComponents[activeTab] || <p>בחר לשונית כדי לראות תוכן.</p>;
  };

  const tabs = [
    { key: "description", label: "📄 תיאור פרויקט" },
    { key: "updates", label: "🔨 עדכונים" },
    { key: "costDetails", label: "💰 פירוט עלויות" },
    { key: "guarantees", label: "🛡️ שוברים וערבויות" },
    { key: "paymentSheet", label: "📋 כרטסת תשלומים" },
    { key: "receiptsInvoices", label: "🧾 קבלות/חשבוניות" },
    { key: "documents", label: "📂 מסמכים אישיים" },
    { key: "fieldPhotos", label: "📷 תמונות מהשטח" },
    { key: "contact", label: "📞 צור קשר" },
  ];

  return (
    <div className="plots-page">
      <Header />
      <Link to="/MainListPlots" className="header-icon-button" title=" למגרשים שלי"></Link>
      {error && <p className="error-text">{error}</p>}

      <h1>
        <FaArrowRight className="header-icon" />
        {plot?.project?.projectName || "[טעינת שם הפרויקט...]"}
      </h1>

      <div className="tabs-container">
        {tabs.map(({ key, label }) => (
          <div
            key={key}
            className={`tab ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default PlotsPage;
