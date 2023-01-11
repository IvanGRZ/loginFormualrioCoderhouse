const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/store-db';
    return {
        mongoUrl: MONGO_URI,
        ttl: 3600,
        mongoOptions: getMongoConfig()
    }
}

export {
    getStoreConfig,
    getMongoConfig
}