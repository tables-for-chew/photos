const randomRestaurant = () => {
  return Math.floor(Math.random() * 10000000)
}
function generateRandomData(userContext, events, done) {
  const id = randomRestaurant();
  userContext.vars.id = id;

  return done();
}
module.exports = {
  generateRandomData,
};