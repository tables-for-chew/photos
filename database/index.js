const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'photo_caro',
  password: 'Password1!',
  port: 5432,
});

const findPhotos = (id, callback) => {
  const query = `SELECT * FROM photos WHERE restaurant_id = ${id}`;
  pool.query(query, (err, photos) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, photos);
  });
};

module.exports = {
  findPhotos,
};