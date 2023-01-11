import express from "express";
import ProductContainer from "../../services/database/productContainer/index.js"
import Products from '../../services/mocks/index.js'


const productService  = new ProductContainer();
//productService.init();

const router = express.Router();

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


export default router;
