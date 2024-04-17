const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const userRouter = require('./userRoutes')
const queryRouter = require('./queryRoutes')

let queriesModel = require('./queries_schema')
let usersModel = require('./users')



mongoose.connect("mongodb://localhost:27017/queriesapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});

// db.dropDatabase();
db.on('error', (error) => {
    console.log(error);
    console.log('Error!')
})

const bodyParser = require('body-parser');
//const { default: Axios } = require('axios');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/user',userRouter)
app.use('/query',queryRouter)



//Adding some dummy question answers
async function addDummyQuestions(question, answersList) {
    try {
        let newQuery = new queriesModel;
        newQuery.question = question;

        newQuery.answers = answersList;

        await newQuery.save();
        console.log('Query added!');
    } catch (err) {
        console.error("Error occurred while adding query:", err);
    }
}

//Adding some dummy users
async function addDummyUsers(email, password){
    try{
        let newUser = new usersModel;
        newUser.email = email;
        newUser.password = password;
        await newUser.save();
        console.log('User added!');

    }catch (err){
        console.error("Error occurred while adding user:", err);

    }

}

/*addDummyQuestions('Is Educative Awesome?',  ['Yes it is', 'Of course!'])
addDummyQuestions('How to learn Vue.js?',  ['Take the course from Educative', 'Educative is a good platform to learn Vue.js'])
addDummyQuestions('How to increase productivity?',  ['Take small breaks while working'])
addDummyUsers('liaoh3@gmail.com','123456')
addDummyUsers('liaoh@qq.com', '123456')
*/

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
