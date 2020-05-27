const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://mansdesmez:Mansour77@cluster0-krsts.mongodb.net/test?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connecté');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = mongoConnect;

