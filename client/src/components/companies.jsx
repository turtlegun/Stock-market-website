import React, { useState } from "react";
import axios from "axios";
import "./companies.css";
import image from "../assets/up.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import image2 from "../assets/down.jpg";
import { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

function Companies() {
  const [newdate, setDate] = useState(new Date());

  const [stock, setStock] = useState({});
  const [selectedCompany, setSelectedCompany] = useState("");

  const tvScriptLoadingPromiseRef = useRef(null);
  const symbolRef = useRef("");
  const companies = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "FB",
    "TSLA",
    "NVDA",
    "NFLX",
    "INTC",
    "CSCO",
    "IBM",
    "GE",
    "WMT",
    "DIS",
    "V",
    "JPM",
    "GS",
    "BA",
    "CVX",
    "KO",
    "PYPL",
    "C",
    "INTU",
    "CAT",
    "MMM",
    "AABA",
    "BABA",
    "AMD",
    "GS",
    "HPE",
    "AAP",
    "F",
    "GOOG",
    "HPQ",
    "HSBC",
    "IBM",
    "JD",
    "LMT",
    "MA",
    "MO",
    "MS",
    "NKE",
    "NVDA",
    "PFE",
    "PG",
    "RHT",
    "SAP",
    "SBUX",
    "SNAP",
    "SPOT",
    "SAP",
    "T",
    "TWTR",
    "TXN",
    "TSLA",
    "UA",
    "UBER",
    "UNH",
    "VZ",
    "VOD",
    "WFC",
    "WMT",
    "XOM",
    "YHOO",
    "YUM",
    "ACN",
    "ADBE",
    "AMGN",
    "AVGO",
    "BAC",
    "BLK",
    "BMY",
    "BP",
    "C",
    "CAT",
    "CELG",
    "CHTR",
    "CL",
    "CMCSA",
    "COP",
    "COST",
    "CVS",
    "CVX",
    "DD",
    "DHR",
    "DIS",
    "DOW",
    "DUK",
    "EMR",
    "EXC",
    "FDX",
    "FOXA",
    "GD",
    "GE",
    "GILD",
    "GM",
    "GOOG",
    "GS",
    "HAL",
    "HD",
    "HON",
    "IBM",
    "INTC",
    "JNJ",
    "JPM",
  ];
  const fetchdata = async (symbol) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/stock/${symbol}`
      );
      // Check if the response data is an object and has the expected structure
      if (response.data && response.data["Time Series (Daily)"]) {
        setStock(response.data);
      } else {
        console.error("Invalid or missing data in the API response");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };


  

  const handleCompanyChange = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected value:", selectedValue);
    setSelectedCompany(selectedValue);
    console.log("Selected company state:", selectedCompany);
    fetchdata(selectedValue);
  };

  const createWidget = () => {
    const tradingViewContainer = document.getElementById("tradingview_cb872");
    if (tradingViewContainer && "TradingView" in window) {
      new window.TradingView.widget({
        autosize: true,
        symbol: selectedCompany,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_cb872",
      });
    }
  };

  useEffect(() => {
    console.log("Selected company state in useEffect:", selectedCompany);
    const onLoadScriptRef = () => {
      if (!tvScriptLoadingPromiseRef.current) {
        tvScriptLoadingPromiseRef.current = new Promise((resolve) => {
          const script = document.createElement("script");
          script.id = "tradingview-widget-loading-script";
          script.src = "https://s3.tradingview.com/tv.js";
          script.type = "text/javascript";
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromiseRef.current.then(() => createWidget());

      return () => (onLoadScriptRef.current = null);
    };

    onLoadScriptRef();
  }, [selectedCompany]);
  return (
    <>
      <div className="companies">
        <h2 className="comp">COMPANIES</h2>
        <h4>Select Company For Data</h4>
        <div className="option">
          <label htmlFor="companySelect">Select a Company:</label>
          <select
            id="companySelect"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
          <label htmlFor="datePicker">Select a Date:</label>
          <DatePicker
            id="datePicker"
            selected={newdate}
            onChange={(newdate) => setDate(newdate)}
          />
        </div>
        <div></div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Open</th>
              <th scope="col">High </th>
              <th scope="col">Low</th>
              <th scope="col">Close</th>
              <th scope="col">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stock["Time Series (Daily)"] &&
              Object.keys(stock["Time Series (Daily)"]).map((date) => {
                // Convert newdate to a string in the format 'YYYY-MM-DD'
                const formattedDate = newdate.toISOString().split("T")[0];
                return (
                  date === formattedDate && (
                    <tr
                      key={date}
                      className="tr"
                      style={{ backgroundColor: "black" }}
                    >
                      <td>{date}</td>
                      <td>${stock["Time Series (Daily)"][date]["1. open"]}</td>
                      <td>
                        ${stock["Time Series (Daily)"][date]["2. high"]}{" "}
                        <img
                          src={image}
                          alt="Increase"
                          style={{ width: "7%", height: "7%" }}
                        />
                      </td>
                      <td>
                        {" "}
                        ${stock["Time Series (Daily)"][date]["3. low"]}
                        <img
                          src={image2}
                          alt="Increase"
                          style={{ width: "6%", height: "6%" }}
                        />
                      </td>
                      <td>${stock["Time Series (Daily)"][date]["4. close"]}</td>
                      <td>{stock["Time Series (Daily)"][date]["5. volume"]}</td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
        <div className="chart">
          <div
            className="tradingview-widget-container"
            style={{ height: "120%", width: "100%" }}
          >
            <div
              id="tradingview_cb872"
              style={{ height: "calc(100% - 32px)", width: "100%" }}
            />
            <div className="tradingview-widget-copyright">
              <a
                href="https://www.tradingview.com/"
                rel="noopener nofollow"
                target="_blank"
              >
                <span className="blue-text">
                  Track all markets on TradingView
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Companies;
