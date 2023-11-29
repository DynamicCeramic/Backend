const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const { User, Timeslot } = require('./db-schema')

const mongoURI = 'mongodb://localhost:27017/aberdeen-ceramics-db';
const app = express();
const port = 8080;
const saltRounds = 5;

app.use(bodyParser.json());

const db = mongoose.connection;
mongoose.connect(mongoURI);

db.once('open', function () {
    console.log('DB running');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
});

//-----------------------------------------------------
//                  GET ROUTES
//-----------------------------------------------------

// test route
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        const user = User.findone({ username });

        if (user) {
            const match = bcrypt.compare(password, user.password);

            if (match) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid Password')
            }
        }
        else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Internal server error');
    }
})

//-----------------------------------------------------
//                  POST ROUTES
//-----------------------------------------------------

app.post('/register', (req, res) => {
    console.log("register route activated")
    //testing purposes
    //console.log(req.body);

    const { name: userName, email, password } = req.body;

    //testing purposes
    //console.log(`'${name}', '${email}', '${password}'`)

    //TODO check if user exists already or not

    let hashedPassword;
    try {
        hashedPassword = bcrypt.hash(password, saltRounds);

        let user = new User({ userName: userName, email, hashedPassword });
        console.log(user);
        user.save();
        res.status(200);
    } catch (err) {
        //TODO implement more informative error handling
        console.error("Error occured when hashing/saving userdata: ", err.message);
        res.status(500);
    }
})

//-----------------------------------------------------
//                  DEVELOPMENT ROUTES
//            only intended for use in testing
//-----------------------------------------------------

app.get("/testgetuser", (req, res) => {
    const userEmail = req.body;

    User.findOne({ email: userEmail }, (err, user) => {
        if (err) {
            console.error("Error when retrieving user: ", err.message)
        }

        if (user) {
            console.log(user);
        } else {
            console.log('User not found');
        }
    })

})

app.get("/getallusers", (req, res) => {
    usersData = User.find()
    console.log(usersData);
})
// app.post("/testwipedatabase", (req, res) => {

// })