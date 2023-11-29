import React, { useEffect, useState } from "react";
import axios from 'axios';

function Balance() {
  const [year, setYear] = useState([]);
  const [quater, setQuater] = useState([]);
  const [header, setHeader] = useState([]);

  const fetchBalanceSheetData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/balancesheet');
      setYear(response.data.anual);
      setQuater(response.data.quater);
      setHeader(Object.keys(response.data.anual[0])); // Assuming `response.data.anual` is an array of objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBalanceSheetData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
    <h2>Balance Sheet Annual</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Break Down</th>
            {year.map((yearItem, index) => (
              <th key={index}>{yearItem.fiscalDateEnding}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {header.map((headerItem, index) => (
            <tr key={index}>
              <td>{headerItem}</td>
              {year.map((incomeItem, idx) => (
                <td key={idx}>{incomeItem[headerItem]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Balance Sheet quater</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Break Down</th>
            {quater.map((incomeItem, index) => (
              <th key={index}>{incomeItem.fiscalDateEnding}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {header.map((headerItem, index) => (
            <tr key={index}>
              <td>{headerItem}</td>
              {quater.map((incomeItem, idx) => (
                <td key={idx}>{incomeItem[headerItem]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Balance;
