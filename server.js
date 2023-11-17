const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')

const mongoURI = 'mongodb://localhost:27017/aberdeen-ceramics-db';
const app = express();
const port = 8080;
const saltRounds = 5;

app.use(bodyParser.json());

const db = mongoose.connection;

mongoose.connect(mongoURI)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
//-----------------------------------------------------
//                  GET ROUTES
//-----------------------------------------------------

// test route
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/login', (req, res) =>{

})
//-----------------------------------------------------
//                  POST ROUTES
//-----------------------------------------------------

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    //testing purposes
    console.log(`'${name}', '${email}', '${password}'`)

    //TODO check if user exists already or not

    let hashedName;
    let hashedEmail;
    let hashedPassword;
    try {
        hashedName = bcrypt.hash(name, saltRounds);
        hashedEmail = bcrypt.hash(email, saltRounds);
        hashedPassword = bcrypt.hash(password, saltRounds);
        
        let user = new models.User(hashedName, hashedEmail, hashedPassword);
        user.save();

    } catch(err){
        //TODO implement more informative error handling
        console.error("Error occured when hashing userdata: ", err.message);
        res.status(500);
    }    
})

//-----------------------------------------------------
//                  DEVELOPMENT ROUTES
//            only intended for use in testing
//-----------------------------------------------------

app.get("/testgetuser", (req, res) =>{

})

app.post("/testwipedatabase", (req, res) =>{

} )