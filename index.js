const express = require("express"); 
 const {json,urlencoded}  = require("express");

 const mongoose = require("mongoose");
 const dotenv = require('dotenv');
 const userRouter = require('./routes/users');
 const auth = require('./middlewares/auth');


 dotenv.config();
  
//  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//    if (error){throw error};
//    console.log('The solution is: ', results[0].solution);
//  });


 mongoose.connect(process.env.MONGODB_STRING);

 const app = express();

 app.use(auth);
 app.use(json());
 app.use(urlencoded({extended: false}));
 app.use("/users",userRouter);
 app.listen(process.env.PORT||50000);
