const faker = require('faker');
const fs = require('fs');
// const generate = require('csv-generate');
const path = require('path');

// Determines how many picutres will be set for a given restaurant ( 0  to 20)
const numberOfPictures = () => {
  return Math.floor(Math.random() * 21)
}

var cwstream = fs.createWriteStream(path.resolve(__dirname + '/../util/datafile1.csv'))


var iteration = 0
let k = 1;
let currentID = 1
let imageID = 1
var collection = '';

var batcher = () => {
  if (iteration === 5000) {
    cwstream.end()
    return
  };
  iteration++
  // creates 1000 unique restaurants
  for (let i = 1; i <= 2000; i++) {
    let pictures = numberOfPictures()
    var itemPage = {};
    itemPage.id = currentID;
    itemPage.restaurantName = faker.company.companyName();
    itemPage.images = [];

    // creates data for each indiviual picture
    for (let j = 1; j <= pictures; j++) {
      var image = {};
      image.id = imageID;
      image.restaurant_id = currentID;
      image.username = faker.name.firstName();
      image.date_posted = faker.date.recent();
      image.image_url = `https://s3.us-east-2.amazonaws.com/photochews/food${k}.jpg`;
      image.caption = faker.lorem.words();
      image.hover_data = faker.lorem.words();

      imageID += 1;
      // error on S3, only 679 pics uploaded. we will reset count after we reach 679
      k++
      if (k === 680) { k = 1 };
      itemPage.images.push(image);
    }
    collection += JSON.stringify(itemPage) + '\n';
    currentID += 1
  }
  writeToStream();
}

async function writeToStream() {
  await cwstream.write(collection, 'UTF8')
  console.log(`Write completed${iteration}/5000`)
  collection = '';
  return batcher()
}

batcher();