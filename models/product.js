const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

  
class Product {
    constructor( title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
      const db = getDb();
      let dbOk;
      if (this._id) {
        //update product
        dbOk = db.collection('products')
        .updateOne({ _id : this._id }, {$set : this});
      } else {
        // create product
        dbOk =  db.collection('products')
        .insertOne(this);
      }
      return dbOk
      .then(result => {
        console.log(result);
      })
      .catch(err => {
          console.log(err);
      });
      }
      
    
    
      static fetchAll(){
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products => {
          console.log(products);
          return products;
        })
        .catch(err => {
          console.log(err);
        });
      }

      static findById(prodId){
        const db = getDb();
        return db.collection('products')
        .find({ _id: new mongodb.ObjectID(prodId)})
        .next()
        .then(product => {
          console.log(product);
          return product;
        })
        .catch(err => {
          console.log(err);
        })
      }

      static deleteById(prodId){
        const db = getDb();
        return db.collection('products')
        .deleteOne({ _id: new mongodb.ObjectID(prodId)})
        .then(product => {
          console.log('DELETE');
          return product;
        })
        .catch(err => {
          console.log(err);
        })

      }

};

module.exports = Product;