import axios from 'axios';
import { useEffect, useState } from 'react';
import './fundamental.css'
function Income() {
  const [income, setIncome] = useState([]);
  const [header, setHeader] = useState([]);
const[company,setCompany]=useState('')

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


  const handleCompanyChange = (event) => {
    const selectedCompany = event.target.value;
    setCompany(selectedCompany); // Updated state variable name
    fetch(selectedCompany);
  };
  const fetch = async (symbol) => {
    try {
      const response = await axios.get( `http://localhost:3000/fundementals/income/ ${symbol}   `);
      const response2 = await axios.get(  `http://localhost:3000/fundementals/income/headers/${symbol} `);
      setIncome(response.data);
      setHeader(response2.data);
    } catch (error) {
      console.log('Error in fetching', error);
    }
  };

  useEffect(() => {
    fetch();
  }, [company]);

  return (
    <>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Income Statement</h1>
      <select
            id="companySelect"
            value={company}
            onChange={handleCompanyChange}
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
      <table className="table">
        <thead>
          <tr>
          
            {income.map((incomeItem, index) => (
              <th key={index}>{incomeItem.fiscalDateEnding}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {header.map((headerItem, index) => (
            <tr key={index}>
              <td>{headerItem}</td>
              {income.map((incomeItem, index) => (
                <td key={index}>{incomeItem[headerItem]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Income;
