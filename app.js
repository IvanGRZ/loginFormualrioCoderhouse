import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv'
import { createServer } from 'http';
import { Server } from "socket.io";

import mongooseConnect from './src/services/models/connect.js';
import router from './src/routes/index.js'
import { getStoreConfig } from './src/services/session/config.js';

dotenv.config();

const app = express();
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'default';

const http = new createServer(app);
const io = new Server(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));

mongooseConnect();

app.use(cookieParser(COOKIE_SECRET));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(router);
//app.use(express.static('./public'));
//app.use(express.static('./public/messageCenter'));

const products = []
const messages = []
const fakeProducts = []

io.on('connection', (socket) => {

    socket.emit('UPDATE_DATA', messages);
    socket.emit('PRODUCT', products);
    socket.emit('UPDATEFAKEPRODUCT', fakeProducts);


    socket.on('NEW_MESSAGE_TO_SERVER', (data, mail) => {
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data);
    });

    socket.on('NEW_PRODUCT', data => {
        products.push(data)
        io.sockets.emit('PRODUCT', products)
    });

    socket.on('FAKEPRODUCT', data => {
        fakeProducts.push(...data)
        io.sockets.emit('UPDATEFAKEPRODUCT', fakeProducts)
    });
})

export default app;