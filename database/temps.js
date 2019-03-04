const faker = require('faker');
const fs = require('fs');
// const generate = require('csv-generate');
const path = require('path');

// Determines how many picutres will be set for a given restaurant ( 0  to 20)
const numberOfPictures = () => {
  return Math.floor(Math.random() * 21)
}



var iteration = 0
let k = 1;
let currentID = 1
let imageID = 1
var collection = '';

var batcher = () => {
  if (iteration === 5000) {
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
      // no more storage allowed on S3, only 679 pics uploaded. we will reset count after we reach 679
      k++
      if (k === 680) { k = 1 };
      itemPage.images.push(image);
    }
    collection += JSON.stringify(itemPage) + '\n';
    currentID += 1
  }
  writeToStream();
}


function writeToStream() {
  // creates write stream with options to append to file
  var cwstream = fs.createWriteStream(path.resolve(__dirname + '/../util/datafile1.csv'), {
    'flags': 'a'
    , 'encoding': null
    , 'mode': 0666
  })
  cwstream.write(collection, 'UTF8')
  cwstream.end()

  // promises to run batcher after writing has finished
  new Promise((resolve, reject) => {
    cwstream.on('finish', () => {
      collection = '';
      batcher()
    });
    cwstream.on('error', () => {
      return console.log('error at iteration # ', iteration)
    });
    resolve(console.log(`Batch ${iteration}/5000 completed`))
    reject('error writing at iteration #', iteration)
  })
}
batcher();