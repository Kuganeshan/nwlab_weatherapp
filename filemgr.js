const {MongoClient}= require('mongodb');
const fs = MongoClient;

const database = 'mongodb://localhost:27017';

const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
      reject('Unableto connect to MongoDB');
    }
    console.log('Connected to MongoDB');
    const db = client.db('WeatherApp');

    db.collection('weatherCollection').insertOne(newdata,(err, result) => {
       if (err) {
         reject('Unable to insert');
       }
       resolve(result);
    })

    client.close();
    });
  });
};


const getAllData = () => {
  return new Promise((resolve, reject) =>{
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
      if (err) {
      reject('Unableto connect to MongoDB');
    }
    console.log('Connected to MongoDB');
    const db = client.db('WeatherApp');

    db.collection('weatherCollection').find().toArray().then((docs) => {
    resolve(docs);
    }, (err) => {
      reject('Unable to fetch docs');
    });

    client.close();
    });

  });
};
const deleteAll = () => {
  return new Promise((resolve, reject) =>{
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
      if (err) {
      reject('Unableto connect to MongoDB');
    }
    console.log('Connected to MongoDB');
    const db = client.db('WeatherApp');

    db.collection('weatherCollection').remove({}).then((result) => {
    resolve(result);
    }, (err) => {
      reject('Unable to delete');
    });

    client.close();
    });

  });
};



module.exports = {
  saveData,
  getAllData,
  deleteAll,
}
