
import Sensex from "./components/sensex";

import Login from "./components/login";
import Signup from "./components/signup";

import Fundemental from "./components/fundementals";
import News from "./components/news";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
       
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
          <Route path="/" element={<Sensex/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/fundemental" element={<Fundemental/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
