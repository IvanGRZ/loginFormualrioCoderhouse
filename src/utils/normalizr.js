import {normalize, denormalize, schema} from 'normalizr'

const normalizeAndDenormalize = (what, obj) => {

    const authorSchema = new schema.Entity('author');
    const messagesSchema = new schema.Entity('messages');

    const chatSchema = new schema.Array(
        {
            author: authorSchema,
            messages: messagesSchema
        },(input, parent, key) => `${input.type}`
    );
    
    if(what == "normalize") {
        return normalize(obj, chatSchema)
    }else{
        return denormalize(obj, chatSchema, obj.entities)

    }  
}

export {normalizeAndDenormalize}