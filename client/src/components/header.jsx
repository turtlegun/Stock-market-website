import React, { useState,useEffect,useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import "./header.moule.css"; // Fixed typo in the import statement
import { Link } from "react-router-dom";
import stock from '../assets/stockblur.jpg'
import Fundemental from "./fundementals";
import { Ticker } from "react-ts-tradingview-widgets";
const Header = () => {

  return (
    <>
    <Ticker colorTheme="dark"></Ticker>

      <div className="nav">
       
        <ul >
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <ScrollLink to="companies" className="scroll2">Loser&Gainers</ScrollLink>
          </li>
          <li>
            <ScrollLink to="loser" className="scroll">Companies</ScrollLink>
          </li>
          <li>
            <Link to="/fundemental">Fundamental</Link>
          </li>
          <li>
          <button className='but'>
<Link to='/login'>Login</Link>
</button>
</li>
<li>
<button className='but1'>
<Link to='/signup'>SignUp</Link>
</button>
</li>
        </ul>
      </div>
      <div className="title">
        <img src={stock}/>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
    <h2 style={{color:'white', fontSize:'50px', fontWeight:'400'}}>Welcome To Buyout</h2>
    <p style={{color:'white',fontWeight:'400'  }}>Marketplace For Risk Takers</p>
  </div>
      </div>
    </>
  );
};

export default Header;