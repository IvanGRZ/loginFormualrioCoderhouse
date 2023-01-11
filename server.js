import app from './app.js'

const SERVER_PORT = process.env.SERVER_PORT || 2345;

app.listen(SERVER_PORT, () => console.info(`Server up and running on port ${SERVER_PORT}`));