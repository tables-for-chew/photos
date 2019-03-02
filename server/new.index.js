const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('./controller.js');

const app = express();

const PORT = 6969;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/photos/:id', controller.findPhotos(req, res));
app.post('/api/create/photos/:id', controller.postPhoto(req, res));
app.put('/api/update/photos/:id/:photoName', controller.updatePhoto(req, res));
app.delete('/api/delete/photos/:id/:photoName', controller.deletePhoto(req, res));


app.listen(PORT, console.log(`Listening to PORT ${PORT}...`));
