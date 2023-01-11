import firebaseMesages from "../../container/firebaseMesages.js";

class messageDaoFirebase extends firebaseMesages {

  constructor() {
    super("Mensajes");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new messageDaoFirebase();
    }
    return this.instance;
  }
}

export default messageDaoFirebase;