const {MongoClient}= require('mongodb');

// MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
//   if (err) {
//   return console.log('Unableto connect to MongoDB');
// }
// console.log('Connected to MongoDB');
// const db = client.db('WeatherApp');
//
// db.collection('weatherCollection').insertOne({
//   address: 'Inti College',
//   summary: 'Cool and Windy',
//   temperature: '22 C',
// }, (err, result) => {
//    if (err) {
//      return cosole.log('Unable to insert');
//    }
//    console.log(result);
// })
//
// client.close();
// });

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  if (err) {
  return console.log('Unableto connect to MongoDB');
}
console.log('Connected to MongoDB');
const db = client.db('WeatherApp');

db.collection('weatherCollection').find().toArray().then((docs) => {
console.log(JSON.stringify(docs));
}, (err) => {
  console.log('Unable to fetch docs');
});

client.close();
});
