import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { fetchUserPlots } from "../../api/apiService"; // ייבוא הקריאה ל-API
import Header from "../Header";
import "./ListPlots.css";

function MainListPlots() {
  const [plots, setPlots] = useState([]);
  const location = useLocation();
  const storedUserId = localStorage.getItem("id");
  const id = location.state?.id || storedUserId;
  const navigate = useNavigate();

  useEffect(() => {
    const getPlots = async () => {
      try {
        const data = await fetchUserPlots(id);
        setPlots(data);
      } catch (error) {
        console.error("Failed to fetch plots", error);
      }
    };
    getPlots();
  }, [id]);

  const handlePageClick = (id) => {
    navigate(`/PlotsPage/${id}`);
  };

  return (
    <div dir="rtl">
      <Header />
      <div className="plots-list">
        {plots.map((plot) => (
          <div
            key={plot.id}
            className="project-card"
            onClick={() => handlePageClick(plot.id)}
          >
            <h3 className="project-title">{plot.project.projectName}</h3>
            <p className="project-info">כתובת: {plot.project.projectAddress}</p>
            <p className="project-info">מספר מגרש: {plot.plotNumber}</p>
            <p className="project-info">גודל: {plot.plotSize} מ"ר</p>
            <p className="project-info">עלות: ₪{plot.plotCost.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainListPlots;
