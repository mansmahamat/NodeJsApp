const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectID = mongodb.ObjectID;

class User {
    constructor(username, email, cart, id){
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save(){
        const db = getDb();
         db.collection('users').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    addToCart(product){
        //const cartProduct = this.cart.items.findIndex(cp =>{
        //    return cp._id === product._id;
        //});
        const updatedCart = {items : [ {productId : new ObjectID(product._id) , quantity: 1 }] };
        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new ObjectID(this._id)},
            { $set: {cart: updatedCart} }
        );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
        .findOne({ _id: new ObjectID(userId) })
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = User;