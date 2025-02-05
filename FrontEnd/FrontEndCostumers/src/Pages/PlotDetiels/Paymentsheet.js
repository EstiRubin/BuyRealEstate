// Payments.js
import React, { useEffect, useState } from "react";
import { getPayments } from "../../api/apiService"; // ייבוא הקריאה ל-API
import "./Paymentsheet.css"; // Import CSS file

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments(); // קריאה ל-API
        console.log("Fetched Payments:", data);

        const processedPayments = data.map(item => ({
          title: item.Title || null,
          movement: item.movement || null,
          dose: item.dose || 0,
          datereference: item.Datereference || null,
          dataValue: item.DataValue || null,
          details: item.details || null,
          surplus: item.surplus || null,
          amount: item.amount || null,
          debitCredit: item.debitCredit || null, // Add missing field
        }));

        setPayments(processedPayments);
      } catch (error) {
        alert("Failed to load payments.");
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="payments">
      <h1 className="title">תשלומים לחשבון הנאמנות</h1>
      <Table data={payments} />

      <h1 className="title">תשלומים לחברת לקנות נדלן</h1>
      <Table data={payments} />

      <h1 className="title">תשלומים נוספים</h1>
      <Table data={payments} />
    </div>
  );
}

const Table = ({ data }) => (
  <table className="payment-table">
    <thead>
      <tr>
        <th>כותרת</th>
        <th>תנועה</th>
        <th>מנה</th>
        <th>ת.אסמכתא</th>
        <th>ת.ערך</th>
        <th>אסמכתא</th>
        <th>פרטים</th>
        <th>חובה / זכות</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((item, index) => (
        <tr key={index}>
          <td>{item.title}</td>
          <td>{item.movement}</td>
          <td>{item.dose}</td>
          <td>{item.datereference}</td>
          <td>{item.dataValue}</td>
          <td>{item.details}</td>
          <td>{item.details}</td>
          <td>{item.debitCredit}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Payments;
