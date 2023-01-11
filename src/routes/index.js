import express from "express";
import ProductContainer from "../services/database/productContainer/index.js"
import Products from '../services/mocks/index.js'

import chatContainer from "../services/database/chatContainer/index.js"
import { messageDao } from '../daos/index.js'


const router = express.Router();

const productService  = new ProductContainer();
const ChatContainer  = new chatContainer();


//productService.init();
//ChatContainer.init();

// api products

router.get('/getAll', async(_req, res) => {
    const result = await productService.getAll();
    return res.send(JSON.stringify(result));
})

router.get('/productos-test', (_req, res) => {
    return res.send(JSON.stringify(Products));
})

router.post('/addProduct', async (req, res, next) => {
    let obj = req.body;
    const result = await productService.addProduct(obj);
    return res.send(JSON.stringify(result));
})


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
