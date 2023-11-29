import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import News from "./news";
import './style.css'
import Header from "./header";
import Companies from "./companies";
import Losers from "./gainers&loser";
import Footer from "./footer";
News
function Sensex() {
 
  return (
    <>
        <Header />
       <div id="companies">

<Companies/>

       </div>
<div id="loser">

<Losers/>

</div>
<div>
  <Footer/>
</div>
       
    </>
);

  }

export default Sensex;
