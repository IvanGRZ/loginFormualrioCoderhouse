import express from "express";
import chatContainer from "../../services/database/chatContainer/index.js"
import { messageDao } from '../../daos/index.js'

const ChatContainer  = new chatContainer();
//ChatContainer.init();

const router = express.Router();

// api messages

router.get('/getMessages', async(_req, res) => {
    const result = await ChatContainer.getAll();
    return res.send(JSON.stringify(result));
})

router.post('/addMessages', async (req, res, next) => {
    let obj = req.body;
    const result = await ChatContainer.addMessage(obj);
    return res.send(JSON.stringify(result));
})


router.post('/getMessagesFirebase', async(req, res) => {
    let obj = req.body;
    messageDao.getAll(obj).then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
})

router.post('/addMessagesFirebase', async (req, res, next) => {
    let obj = req.body;
    messageDao.addMessage(obj)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
})

export default router;
