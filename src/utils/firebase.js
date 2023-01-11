import admin from "firebase-admin";
import serviceAccount from '../services/database/databasecoderhouse-firebase-adminsdk-z6347-ca2a46754a.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://databasecoderhouse-default-rtdb.firebaseio.com"
});

const db = admin.database();

export {admin}
export {db}
