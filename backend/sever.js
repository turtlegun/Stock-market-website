const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookie_parser=require('cookie-parser')
require('dotenv/config')
const {verify}=require('jsonwebtoken')
const {hash,compare}=require('bcryptjs')
const bycrpyt=require('bcryptjs')

const yfinance = require('yfinance');
const plotly = require('plotly')();

const axios = require('axios');





mongoose.connect('mongodb://127.0.0.1:27017/simple_1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loginSchema = new mongoose.Schema({
  first_name:String,
  email:String,
  password:String
});
const loginModel = mongoose.model('login2', loginSchema);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions)
  
  
  );

console.log('Model created');

//get method



const secretKey = process.env.ACCESS_TOKEN;
const refreshtoken=process.env.REFRESH_TOKEN;



const apiOptions = {
  method: 'GET',
  url: 'https://public-holiday.p.rapidapi.com/2023/india',
  headers: {
    'X-RapidAPI-Key': '669cc16996msh65c003bba835e65p16df10jsncbe18e0b9cfd',
    'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com',
  },
};

app.get('/losers',async(req,res)=>{

url='https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'

response=await axios.get(url)
const top_gainers=response.data.top_gainers.slice(0,10)


response2=await axios.get(url)
const top_losers = response2.data.top_losers ? response2.data.top_losers.slice(0, 10) : [];

res.json({
top_gainer:top_gainers,
top_losers:top_losers
})

})

app.get('/fundementals/income',async(req,res)=>{

url= 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo'
response=await axios.get(url)

let keys = new Set();
function extractkey(obj){
  for (let key in obj) {
    
    keys.add(key);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractkey(obj[key]);
    }
}



}

extractkey(response.data)

const keysArray = Array.from(keys);
console.log(keysArray.slice(3, 29));
res.json(response.data.annualReports.slice(0,3))

})

app.get('/fundementals/income/headers',async(req,res)=>{

  url= 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo'
  response=await axios.get(url)
  
  let keys = new Set();
  function extractkey(obj){
    for (let key in obj) {
      
      keys.add(key);
      if (typeof obj[key] === 'object' && obj[key] !== null) {
          extractkey(obj[key]);
      }
  }
  
  
  
  }
  
  extractkey(response.data)
  
  const keysArray = Array.from(keys);
  res.json(keysArray.slice(3, 29));
 
  



})



app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const symbol =  req.params.symbol;
    const interval = req.query.interval || '5min';
const key='D1KT1R9B07ABVK5S'
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`;
    console.log('Request URL:', url);

    const response = await axios.get(url);

   

    const stockData =response.data;

    res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.get("/balancesheet",async(req,res)=>{

  const symbol=req.params.symbol
  console.log(symbol)
  
  const response=await axios.get( `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=demo `)
  
  const anual=response.data.annualReports.slice(0,3)
  const quater=response.data.quarterlyReports.slice(0,3)
  const keys=Object.keys(response.data)
  res.json({anual,quater})
  

  
  })
  






app.get('/new2',async(req,res)=>{

  const key='D1KT1R9B07ABVK5S'
const url=  `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo  `
const respone=await axios.get(url)

res.json(respone.data)

})






//register
app.post('/user', async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await loginModel.findOne({ email: req.body.email });

    if (existingUser) {
      console.log("user exist")
      return res.json({ message: 'User already exists' });
      
    }

    // Hash the user's password
    const hashedPassword = await  bycrpyt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const newUser = new loginModel({
      first_name: req.body.first_name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating a new user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await loginModel.findOne({ email });

    console.log('Password:', password);
    console.log('User Password:', user ? user.password : 'User not found');

    if (!user || !(await bycrpyt.compare(password, user.password))) {
      return res.json({ message: 'invalid password' });
    }

    const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, refreshtoken, { expiresIn: '7d' });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    res.json({ message: 'Login successful' });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, accessSecret, { expiresIn: '15m' });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });

    res.json({ message: 'Access token renewed' });
  });
});



app.get("/user/search",async(req,res)=>{

const user=await loginModel.find({password:req.body.password}).lean();
res.json(user)


})


app.delete('/user/delete/:email',async(req,res)=>{


const result =await loginModel.deleteOne({email:req.params.email})

res.json(result)
console.log("user deleted")

})


app.get("/login/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  loginModel.find({ email, password })
    .then(users => {
      if (users.length > 0) {
        res.send('Login successful');
      } else {
        res.send('Login failed');
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      res.send('Login error');
    });
});

app.get("/allUser",async(req,res)=>{

const user=await loginModel.find().lean()
res.json(user)

})



app.listen(3000, () => {
  console.log('Server created and listening on port 3000');
});
