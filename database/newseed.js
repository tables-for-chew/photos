const faker = require('faker');
const csv = require('csv');

// // Determines how many picutres will be set for a given restaurant ( 0  to 20)
// const numberOfPictures = () => {
//   return Math.floor(Math.random() * 21)
// }

// var collection = [];
// let k = 1;

// // creates 1000 unique restaurants
// for (let i = 1; i <= 1000; i++) {
//   let pictures = numberOfPictures()
//   var itemPage = {};
//   itemPage.id = i;
//   itemPage.restaurantName = faker.company.companyName();
//   itemPage.images = [];

//   // creates data for each indiviual picture
//   for (let j = 1; j <= pictures; j++) {
//     var image = {};
//     image.id = j;
//     image.restraunt_id = i;
//     image.username = faker.name.firstName();
//     image.date_posted = faker.date.recent();
//     image.image_url = `https://s3.us-east-2.amazonaws.com/photochews/food${k}.jpg`;
//     image.caption = faker.lorem.words();
//     image.hover_data = faker.lorem.words();

//     // error on S3, only 679 pics uploaded. we will reset count after we reach 679
//     k++
//     if (k === 679) { k = 1 };
//     itemPage.images.push(image);
//   }

//   collection.push(itemPage);
// }
{
  separator: ',',
    newline: '\n',
      headers: undefined,
        sendHeaders: true
}

csv
  .generate({
    delimiter: '|',
    length: 10
  })
  .pipe(process.stdout)
