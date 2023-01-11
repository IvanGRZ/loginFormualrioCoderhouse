import knexConfig from '../config.js';
import knex from 'knex'; 

const kn = new knex(knexConfig);

class chatContainer {

  async init() {
    await kn.schema.createTableIfNotExists('mensajes', (table) => {
      table.increments("id");
      table.string("username");
      table.string("message");
      table.string("moment");
    }).then(() => {
        console.info('Table created');
    }).catch(err => {
        console.error(err)
    })
  }

  async addMessage(object) {
    try {
      return await kn('mensajes').insert([object]);
    } catch (err) {
      return `Ocurrio un error al guardar el datos en la DB ${err}`;
    }
  }

  async getAll() {
    try {
      return await kn.from('products').select("*");
    } catch (err) {
      return `Error: ${err}`;
    }
  }
}

export default chatContainer;