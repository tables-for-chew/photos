const faker = require('faker');
const fs = require('fs');
// const generate = require('csv-generate');
const path = require('path');

// Determines how many picutres will be set for a given restaurant ( 0  to 20)
const numberOfPictures = () => {
  return Math.floor(Math.random() * 21)
}

// global variables
var iteration = 0;
let k = 1;
var restaurantCollection = '';
let restaurantID = 1;
var imageCollection = '';
let imageID = 1;

var batcher = () => {
  if (iteration === 50) {
    return
  };
  iteration++

  // creates 1000 unique restaurants
  for (let i = 1; i <= 2000; i++) {
    var restaurant = [];
    restaurant.push(`${restaurantID}`);
    restaurant.push(`${faker.company.catchPhraseNoun()}`);

    restaurantCollection += JSON.stringify(restaurant).slice(1, -1) + '\n';
    // creates data for each indiviual picture
    let pictures = numberOfPictures()
    for (let j = 1; j <= pictures; j++) {
      var image = [];
      image.push(`${imageID}`);
      image.push(`${restaurantID}`);
      image.push(`https://s3.us-east-2.amazonaws.com/photochews/food${k}.jpg`);//url
      image.push(`${faker.lorem.words()}`); //caption
      image.push(`${faker.date.past().toDateString()}`); //date post
      image.push(`${faker.name.firstName()}`); //username
      image.push(`${faker.lorem.words()}`); // hover data

      // only 679 pics uploaded on S3. we will reset count after we reach 679
      k++
      if (k === 680) { k = 1 };

      imageCollection += JSON.stringify(image).slice(1, -1) + '\n';
      imageID += 1;
    }
    restaurantID += 1
  }

  writeToStream();
}


function writeToStream() {
  // creates write stream with options to append to file
  var cwstreamRestaurant = fs.createWriteStream(path.resolve(__dirname + '/../util/restaurantDataFile.csv'), {
    'flags': 'a'
    , 'encoding': null
    , 'mode': 0666
  })
  cwstreamRestaurant.write(restaurantCollection, 'UTF8')
  cwstreamRestaurant.end()

  // promises to run write stream for  images after  restaurant writing has finished
  new Promise((resolve, reject) => {
    cwstreamRestaurant.on('finish', () => {
      restaurantCollection = '';
      writeImages()
    });
    cwstreamRestaurant.on('error', () => {
      return console.log('error at iteration # ', iteration)
    });
    resolve(console.log(`Batch ${iteration}/5000 restaurants completed`))
    reject('error writing at restaurant iteration #', iteration)
  })

  function writeImages() {
    var cwstreamImage = fs.createWriteStream(path.resolve(__dirname + '/../util/imageDataFile.csv'), {
      'flags': 'a'
      , 'encoding': null
      , 'mode': 0666
    })
    cwstreamImage.write(imageCollection, 'UTF8')
    cwstreamImage.end()

    // promises to run batcher after writing has finished
    new Promise((resolve, reject) => {
      cwstreamImage.on('finish', () => {
        imageCollection = '';
        batcher()
      });
      cwstreamImage.on('error', () => {
        return console.log('error at iteration # ', iteration)
      });
      resolve(console.log(`Batch ${iteration}/5000 images completed`))
      reject('error writing at image iteration #', iteration)
    })
  }
}
batcher();