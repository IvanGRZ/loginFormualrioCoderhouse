import messageDaoFirebase from './Message/messageDaoFirebase.js'

let messageDao = null;

const type = process.env.PERS || "fs";

switch (type) {
  case "fs":
    messageDao = messageDaoFirebase.getInstance();
    break;
}

export { messageDao };