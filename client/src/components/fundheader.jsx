import './fund.css'
import { Link } from "react-router-dom";
function Fheader() {
    return ( <>
    
    <nav className="nav2">
        <ul>
          <li>
            <Link to="/news">news</Link>
          </li>
          

          <li>
            <Link to="/"> Home</Link>
          </li>

          
          <li>
            <Link>balance sheet</Link>
          </li>
         
          <li>
          <Link>balance sheet</Link>
          </li>

        </ul>


      </nav>

    
    
    </> );
}

export default Fheader;