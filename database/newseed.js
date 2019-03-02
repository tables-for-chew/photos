const faker = require('faker');
// const csv = require('csv');
const fs = require('fs');
const generate = require('csv-generate');
const path = require('path');
// Determines how many picutres will be set for a given restaurant ( 0  to 20)
const numberOfPictures = () => {
  return Math.floor(Math.random() * 21)
}

var iteration = 0
var collection = '';
var batcher = () => {
  if (iteration > 100) { return };
  let k = 1;
  // creates 1000 unique restaurants
  for (let i = 1; i <= 10000; i++) {
    let pictures = numberOfPictures()
    var itemPage = {};
    itemPage.id = i;
    itemPage.restaurantName = faker.company.companyName();
    itemPage.images = [];

    // creates data for each indiviual picture
    for (let j = 1; j <= pictures; j++) {
      var image = {};
      image.id = j;
      image.restraunt_id = i;
      image.username = faker.name.firstName();
      image.date_posted = faker.date.recent();
      image.image_url = `https://s3.us-east-2.amazonaws.com/photochews/food${k}.jpg`;
      image.caption = faker.lorem.words();
      image.hover_data = faker.lorem.words();

      // error on S3, only 679 pics uploaded. we will reset count after we reach 679
      k++
      if (k === 679) { k = 1 };
      itemPage.images.push(image);
    }

    collection += JSON.stringify(itemPage);
  }
  writeToStream();
}

var writeToStream = () => {
  var cwstream = fs.createWriteStream(path.resolve(__dirname + '/../util/datafile1.csv'))
  // const array = new Array(1000);
  // for (let i = 0; i < array.length; i++) {
  // }
  cwstream.write(collection, 'UTF8')
  iteration++
  cwstream.end()
  cwstream.on('finish', () => {
    console.log("Write completed.")
    batcher()
  })
  cwstream.on('error', (err) => {
    console.log(err.stack)
  })
}

batcher();
// generate({
//   seed: 1,
//   columns: 3
// }, (err, collection) => {
//   if (err) {
//     console.log('error on seed generation', err);
//   }
//   return collection
// }
// )
//   .pipe(path.resolve(__dirname + '/../../util/datafile1.csv'))
