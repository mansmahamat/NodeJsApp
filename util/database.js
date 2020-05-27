const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://mansdesmez:Mansour77@cluster0-krsts.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connecté');
        _db = client.db()
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

    
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'Aucun base de données trouvé';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

