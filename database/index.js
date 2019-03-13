const { Pool } = require('pg');

const pool = new Pool({
  user: 'power_user',
  host: 'ec2-18-216-123-218.us-east-2.compute.amazonaws.com',
  database: 'photo_caro',
  password: 'Password1!',
  port: 5432,
  max: 10,
});

const findPhotos = (id, callback) => {
  const query = `SELECT * FROM photos WHERE restaurant_id = ${id}`;
  pool.connect()
    .then(client => {
      return client.query(query)
        .then(res => {
          client.release()
          callback(null, res)
        })
    })
};

module.exports = {
  findPhotos,
};