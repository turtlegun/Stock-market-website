
import Balance from "./balance";
import Fheader from "./fundheader";
import Income from "./income";
import { Ticker } from "react-ts-tradingview-widgets";


function Fundemental() {
  return ( <>
  <Ticker colorTheme="dark"></Ticker>
 <Fheader/> 
  
  <Income/>

  <Balance/>
  
  
  </> );
}

export default Fundemental;