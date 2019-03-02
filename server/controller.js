const db = require('./databse/index.js');

const postPhoto = (req, res) => {
  const id = req.params;
  db.postPhoto(id)
    .then((res) => {
      res.status(201).send('sucessfully posted photo')
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

const findPhotos = (req, res) => {
  const id = req.params;
  db.findPhotos(id)
    .then((photos) => {
      res.status(200).send(photos);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}


const updatePhoto = (req, res) => {
  const id = req.params;
  db.updatePhoto(id)
    .then((res) => {
      res.status(200).send('successfully updated photo')
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

const deletePhoto = (req, res) => {
  const id = req.params;
  db.deletePhoto(id)
    .then((res) => {
      res.status(200).send('successfully deleted photo')
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

module.exports {
  findPhotos,
    postPhoto,
    updatePhoto,
    deletePhoto
}