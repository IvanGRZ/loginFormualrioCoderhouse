import knexConfig from '../config.js';
import knex from 'knex'; 

const kn = new knex(knexConfig);

class ProductContainer {

  /*
  constructor() {
    this.init();
  }
  */

  async init() {
    await kn.schema.createTableIfNotExists('products', (table) => {
      table.increments("id");
      table.string("title");
      table.float("price");
      table.string("thumbnail");
    }).then(() => {
        console.info('Table created');
    }).catch(err => {
        console.error(err)
    }).finally(() => {
        kn.destroy();
    });
  }

  async addProduct(object) {
    try {
      return await kn('products').insert([object]);
    } catch (err) {
      return `Ocurrio un error al guardar el datos en la DB ${err}`;
    }
  }

  async getById(id) {
    try {
      return await kn
        .from('products')
        .select("*")
        .where("id", id)
        .limit(1);
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async getAll() {
    try {
      return await kn.from('products').select("*");
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async deleteById(id) {
    try {
      return await knex.from('products').where("id", id).del();
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async deleteAll() {
    try {
      return await knex.from('products').del();
    } catch (err) {
      return `Error: ${err}`;
    }
  }
}

export default ProductContainer;