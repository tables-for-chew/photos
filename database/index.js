const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'photo_caro',
  password: 'Password1!',
  port: 5432,
  max: 10,
});

const findPhotos = (id, callback) => {
  const query = `SELECT * FROM photos WHERE restaurant_id = ${id}`;
  //
  pool.connect()
    .then(client => {
      return client.query(query)
        .then(res => {
          client.release()
          callback(null, res)
        })
    })

  // pool.query(query, (err, photos) => {
  //   console.log(pool.totalCount, pool.idleCount, pool.waitingCount)
  //   if (err) {
  //     callback(err);
  //     return;
  //   }
  //   callback(null, photos);
  // });
};

module.exports = {
  findPhotos,
};