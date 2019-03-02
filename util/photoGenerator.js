const axios = require('axios');
const path = require('path');
const fs = require('fs');

async function downloadImage(params) {
  const { id, width, height, imageName } = params;
  const url = `https://loremflickr.com/${width}/${height}/food?random=${id}`;
  const filepath = path.resolve(__dirname, '..', 'images', imageName);
  const writer = fs.createWriteStream(filepath);

  const response = await axios.get(url, {
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

for (let i = 0; i < 1000; i += 1) {
  const params = {
    id: i,
    width: 640,
    height: 480,
    imageName: `food${i + 1}.jpg`,
  };
  downloadImage(params)
    .catch((error) => {
      console.log(error);
    });
}