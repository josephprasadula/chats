const express = require('express');

const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/users");
const Messages = require('../models/messages');

userRouter.post("/register", async (req, res) => {
    try {
        const checkUser = await User.find({ email: req.body.email });
        if (checkUser.length > 0) {
            res.send({
                err: "Email already registered"
            });
            return;
        }
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);
        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: password,
        })
    }
    catch (err) {
        res.send(err);
        return;
    }
})

userRouter.post("signin", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length == 0) {
            res.send({
                err: "Email not registered"
            })
            return;
        }
        const checkPass = await bcrypt.compare(req.body.password, user[0].password);
        if (checkPass) {
            const token = jwt.sign({
                userId: user[0]._id,
                email: user[0].email
            },process.env.JWT_KEY)
            res.send({
                token
            })
            return;
        }
        else {
            res.send({
                err: "Wrong Password"
            })
            return;
        }
    }
    catch (err) {
        res.send(err);
        return;
    }
})

userRouter.get("/messages", async (req,res) => {
    try {
        if(req.isAuth) {
            const userData = await User.findById(req.userId);
            const {sentMessages,receivedMessages} = userData;
            let message = {};
            let sentMgsData = [];
            
            sentMessages.forEach(async (msgId) => {
                const temp = await Messages.findById(msgId);
                sentMgsData.push(temp);
            }); 
            let receivedMgsData = receivedMessages.map(async (msgIds) => {
                return await Messages.findById(msgIds);
            });

            message.sentMessages = sentMgsData;
            message.receivedMessages = receivedMgsData;

            res.send(message);
            return;
            
        }
        else {
            res.send({err:"Please Login"});
            return;
        }
        
    } catch (error) {
        res.send(error);
        return;
    }
})

module.exports = userRouter;