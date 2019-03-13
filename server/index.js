require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('./controller.js');
const morgan = require('morgan');

const app = express();

const PORT = 6969;

// app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/photos/:id', controller.findPhotos);
app.post('/api/create/photos/:id', controller.postPhoto);
app.put('/api/update/photos/:id/:photoName', controller.updatePhoto);
app.delete('/api/delete/photos/:id/:photoName', controller.deletePhoto);

app.get('/loaderio-213df0b7319eb3d7d03a853733cab103/', (req, res) => {
  res.sendFile('loaderio.txt', function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  })
})
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));
app.listen(PORT, console.log(`Listening to PORT ${PORT}...`));
