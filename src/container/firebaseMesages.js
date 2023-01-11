import {db} from '../utils/firebase.js'
import {normalizeAndDenormalize} from '../utils/normalizr.js'

class firebaseMesages {

    constructor(collectionName) {
        this.customPath = collectionName;
    }

    async addMessage(obj){
        try{

            const count = db.ref('/entities/messages').once('value').then(snapshot => {return snapshot.numChildren()}).catch(e => console.log(e))
            const id = await count;
            const userID = obj[0].id;

            obj.map(item => {
                if(item.type == 'messages'){
                    item.id = id
                }
            })

            const messagesNormalized = normalizeAndDenormalize("normalize", obj);
            const entities = messagesNormalized['entities']

            db.ref(`/entities/messages/${id}`).update(entities.messages[id], error => {
                if (error){
                    console.log("Failed with error: " + error)
                }
                else{
                    console.log("success")
                    return messagesNormalized;
                }                
            });

            

        }
        catch(error){
            console.log(error)
        }
    }

    async getAll(obj){

        try{

            let user = obj.mailIDValue.toString()
            let connected = {}
            let messagesDenormalized;
        
            const data = db.ref().once('value').then(snapshot => {return snapshot.val()}).catch(e => console.log(e))
            const resolveData = await data
            messagesDenormalized =  normalizeAndDenormalize("denormalize",  resolveData);

            let result = messagesDenormalized.entities.author[user]

            if(result != undefined){
                connected = {
                    connected: 'true',
                    info: messagesDenormalized.entities
                }
            }
            else{
                connected = {
                    connected: 'false',
                    info: {}
                }
            }

            return connected
        }
        catch(error){
            console.log(error)
        }
    }

}

export default firebaseMesages;