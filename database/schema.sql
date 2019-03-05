DROP DATABASE IF EXISTS photo_caro;

CREATE DATABASE photo_caro;

\c photo_caro;

\timing;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS photos;

CREATE TABLE restaurants (
  id SERIAL NOT NULL PRIMARY KEY,
  restaurant_name TEXT
);

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  restaurant_id INT,
  image_url TEXT,
  caption TEXT,
  date_posted DATE,
  username TEXT,
  hover_data TEXT
);

\COPY restaurants(id, restaurant_name) FROM '../util/restaurantDataFile.csv' DELIMITER ',' CSV HEADER;
\COPY photos(id, restaurant_id, image_url, caption, date_posted, username, hover_data) FROM '../util/imageDataFile.csv' DELIMITER ',' CSV HEADER;