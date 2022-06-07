const express = require('express');
const app = express();
const mongoose = require('mongoose');
const EmployeeRoute = require('./routes/employee'); 

app.use('/employee', EmployeeRoute);
app.use(express.json());
mongoose 
    .connect('mongodb://localhost/company')
    .then(()=> console.log("Connected to DB"))
    .catch(()=> console.log("Could not connect to DB"));

app.get('/', (req, res)=> {
    res.send("<h1>Home Page</h1>");
});

const port = 3000;
app.listen(port, ()=> {
    console.log(`port: ${port} app.js`);
})