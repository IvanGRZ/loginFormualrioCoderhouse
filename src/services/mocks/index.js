import { faker } from '@faker-js/faker';

const Products = [];

export const createRandomData = () => {

    return {
        id: faker.datatype.uuid(),
        title: faker.vehicle.vehicle(),
        price:faker.finance.amount(5, 10, 2, '$'),
        thumbnail: faker.image.transport()  
    };
}

Array.from({ length: 5 }).forEach(() => {
    Products.push(createRandomData());
});


export default Products;