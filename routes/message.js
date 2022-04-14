const express = require('express');

const Message = require('../models/messages');
const User = require('../models/users');

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", async(req,res) => {
    try {
        if(req.isAuth) {

            const date = new Date();

            const messageData = await Message.create({
                sender: req.userId,
                receiver: req.params.receiverId,
                message: req.body.message,
                createdAt: date
            });
            const sender = await User.findByIdAndUpdate(req.userId,{
                $push:{"sentMessages":messageData._id}
            });
            const receiver = await User.findByIdAndUpdate(req.params.receiverId,{
                $push:{'receivedMessages':messageData._id}
            });

            res.send(messageData);
            return;

        }
        else {
            res.send({err:"Please Login"});
            return;
        }
    }
    catch(err) {
        res.send(err);
        return;
    }
})

messageRouter.delete("/delete/:msId",async(req,res)=>{
    try{
        if(req.isAuth){
            const userData = await User.findById(req.userId);
            const {sentMessages,receivedMessages}=userData;
            const smtemp = sentMessages.filter(msgId=>req.params.msgId==msgId);
            const msgData= await Message.findById(req.params.msgId)
            
            
            $pull
            const data= await Message.findByIdAndDelete(re1.params.MsgId)
        }else{
            res.send({err:"please login"})
            return;
        }
    }
    catch(err){
        res.send(err);
        return
    }
})

module.exports = messageRouter;