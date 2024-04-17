// routes/userRoutes.js

const express = require('express');
const router = express.Router();
let usersModel = require('./users')
const bcrypt = require('bcrypt'); // 用于密码加密
const jwt = require('jsonwebtoken'); // 用于生成JWT令牌
const secretKey = 'haya_meeting_app_2023';

/*
//creating a user
router.post('/register',async(req, res) => {
    try{
        console.log(req.body);
        let newUser = new usersModel;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        await newUser.save();
        res.send('User: ' + newUser.email+" added");
        console.log('User added!');

    } catch (err){
        console.error("Error occurred while creating user", err);
        res.status(500).send("Error while creating user!");

    }
});
*/
// 用户注册路由
router.post('/register', async (req, res) => {
    try {
        // 从请求体中获取用户提供的信息
        const { email, password } = req.body;

        // 检查邮箱是否已经被注册
        const existingUser = await usersModel.findOne({ email });
        if (existingUser!==null) {
            return res.status(400).json({ message: 'This Email has been used!' });
        }

        // 使用bcrypt对密码进行哈希处理
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
      //  let newUser = new usersModel;
       // newUser.email = email;
      //  newUser.password = hashedPassword;

        // 创建新用户
        const newUser = new usersModel({ email, password: hashedPassword });
        await newUser.save();

        // 返回成功消息
        res.status(201).json({ message: 'Registered Successfully!' });
    } catch (error) {
        console.error('Error occurred while registering user:', error.message);
        res.status(500).json({ message: 'Sever Error' });
    }
});

// 用户登录路由
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        // 查找是否存在指定用户名的用户
        const user = await usersModel.findOne({ email });

        if (user===null) {
            throw new Error('The user name or password is incorrect');
        }
        // 使用bcrypt比较密码是否匹配

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword ) {
            throw new Error('The user name or password is incorrect');
        }
        // 如果密码匹配，则生成JWT令牌
        //'your_secret_key'可以用其他字符串
        const token = jwt.sign({ userId: user._id}, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error occurred while logging in here:', error.message);
        res.status(401).json({ message: 'The user name or password is incorrect' });
    }
});

module.exports = router;
