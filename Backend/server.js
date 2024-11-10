const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const cors = require('cors');


const app = express();

dotenv.config();
connectDB();          //DB connection

app.use(express.json()); // for getting json data from user   // Built-in middleware to parse JSON

const corsOptions = {
    origin: [
      "http://localhost:5173"
    ],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

app.use(cors(corsOptions));

app.get('/', (req,res)=>(
    res.send("API is running")
))

app.use('/users', userRoutes);

app.use(notFound,errorHandler);


app.listen(5000, console.log("server started on port 5000"));