const express = require('express');
const router = express.Router();
let queriesModel = require('./queries_schema')




// creating a query
router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        let newQuery = new queriesModel;
        newQuery.question = req.body.question;
        newQuery.answers = [];
        await newQuery.save();
        res.send("Query added");
        console.log('Query added!');
    } catch (err) {
        console.error("Error occurred while adding query:", err);
        res.status(500).send("Error while adding Query");
    }
});

//search
router.get('/answer/:searchText', async (req, res) => {
    try {
        console.log(req.params.searchText)
        const foundQuestion = await queriesModel.findOne({ question: req.params.searchText});
        if (foundQuestion) {
            console.log(foundQuestion)
            res.json(foundQuestion); // 返回找到的答案

        } else {
            res.status(404).json({ error: 'Answer not found' }); // 返回404状态码表示未找到答案
        }
    } catch (error) {
        console.error('Error while getting answer:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // 返回500状态码表示服务器内部错误
    }
});

// get all Questions
router.get('/get', async (req, res) => {
    try {
        const questions = await queriesModel.find({ question: { $exists: true } });
        res.json(questions);
    } catch (error) {
        console.error("Error while fetching questions:", error);
        res.status(500).send("Error while fetching questions");
    }
});


// add answer
router.post('/answer/:question', async (req, res) => {
    try {
        console.log(req.params.question)
        const query = await queriesModel.findOne({ question:  req.params.question});
        if (query!=null) {
            // 在查询结果的基础上进行更新
            query.answers.push(req.body.answer);
            // 保存更新后的文档
            const updatedQuery = await query.save();
            // 返回更新后的文档
            res.send(updatedQuery);
            console.log('Answer added!', req.body.answer);
        } else {
            // 如果未找到符合条件的文档，则返回 404 Not Found 错误
            res.status(404).send('Query not found');
            console.log('Query not found:', req.params.id);
        }
    } catch (error) {
        console.log("Error while adding answer:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
