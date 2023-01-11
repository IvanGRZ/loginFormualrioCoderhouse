const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rupert-db';
    return {
        mongoUrl: MONGO_URI,
        ttl: 3600,
        mongoOptions: getMongoConfig()
    }
}

export {getStoreConfig}