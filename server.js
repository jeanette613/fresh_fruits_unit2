// Import Our Dependencies
require('dotenv').config(); // Load ENV Variables into process.env
const express = require('express'); //import express
const morgan = require('morgan'); //import morgan
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path'); // built in node module we use to resolve paths more on this when we use it

// Database Connection

const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (error) => console.log(error));

//models

const { Schema, model } = mongoose;
/*cosnt Schema = mongoose.Schema;
const model = mongoose.model;
This is same as called object destructuring and this code is same as one line above
*/

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
});
//make fruit model
const Fruit = model('Fruit', fruitSchema);

// Create our Express Application Object Bind Liquid Templating Engine
const app = express()
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx')

//Middleware
app.use(morgan('tiny')); //logging
app.use(express.urlencoded({ extended: true }));// parse urlencoded request bodies
app.use(methodOverride('_method')); // override for put and delete requests from forms
app.use(express.static('public')); // serve files from public statically

//Routes

app.get('/', (req, res) => {
    res.send('Your server be marathoning')
})

app.get('/fruits/seed', (req, res) => {
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]


    //Delete all fruits
    Fruit.deleteMany({}).then((data) => {
        Fruit.create(startFruits).then((data) => {
            res.json(data);
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
})


//Index

app.get('/fruits', (req, res) => {
    Fruit.find({})
        .then((fruits) => {
            res.render('fruits/Index', { fruits })
        })
        .catch((error) => {
            res.status(400).jason({ error })
        })
})

//Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log('Now got ears on port'))