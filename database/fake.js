const faker = require('faker')

var fakeName = faker.date.past().toDateString();

console.log(fakeName);