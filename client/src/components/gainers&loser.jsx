import axios from 'axios'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import image from '../assets/up.jpg'
import image2 from '../assets/down.jpg'

import './gainers&losers.css'

function Losers() {
const [gainer,setGainer]=useState([])  
const[loser,setLoser]=useState([])  

const fetch=async()=>{
try{
const response=await axios.get('http://localhost:3000/losers')

setLoser(response.data.top_losers)
setGainer(response.data.top_gainer)

}catch(error){

console.error("error fetching data")

}

}
useEffect(()=>{

fetch();


},[])
  return ( <>
<div className='lossers'> 
<h2 className='h2'>Gainers</h2>
<table class="table">
<thead>
<tr>
<th>Ticker</th>
<th> Price</th>
<th>Change Amount</th>
<th>Change Percentage</th>
<th>Volume</th>

</tr>
</thead>

<tbody>
 {gainer.map((gainer,index)=>(

   


<tr key={index}>
<td>{gainer.ticker}</td>
<td>${gainer.price} <img src={image} alt="Increase" style={{ width: '7%', height: '7%' }} /></td>
<td> ${gainer.change_amount}</td>
<td>{gainer.change_percentage}</td>
<td>{gainer.volume}</td>

</tr>


))}
</tbody>
</table>  



    <h2 className='h2'>Losers</h2>
<table class="table">
<thead>
<tr>
<th>Ticker</th>
<th> Price</th>
<th>Change Amount</th>
<th>Change Percentage</th>
<th>Volume</th>

</tr>
</thead>

<tbody>
 {loser.map((loser,index)=>(

   


<tr key={index}>
<td>{loser.ticker}</td>
<td>${loser.price}<img src={image2} alt="Increase" style={{ width: '7%', height: '7%' }}/></td>
<td> ${loser.change_amount}</td>
<td>{loser.change_percentage}</td>
<td>{loser.volume}</td>

</tr>


))}
</tbody>
</table> 
</div>  
    </> );
}

export default Losers;