const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/aberdeen-ceramics-db';
const app = express();
const port = 8080;

let db;
mongoClient.connect(url, function (err, database) {
    if (err) { throw err };
    db = database;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
})


//-----------------------------------------------------
//                  GET ROUTES
//-----------------------------------------------------

// test route
app.get('/', (req, res) => {
    res.send('Hello world');
})

//-----------------------------------------------------
//                  POST ROUTES
//-----------------------------------------------------