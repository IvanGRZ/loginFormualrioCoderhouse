import mongoose from 'mongoose';
import { getMongoConfig } from '../session/config.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/store-db';

const mongooseConnect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        console.info('MONGOOSE CONNECTION OK');
    }).catch(err => {
        console.error(err);
        process.exit();
    })    
}

export default mongooseConnect;