const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'Tout les produits',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getOneProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([rows, fieldData ]) => {
    res.render('shop/product-detail',{
      pageTitle: 'product.title',
      path: '/products',
      product : rows[0]
    });
  })
  .catch(err => {
    console.log(err);
  });
};

  exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    } )
    .catch(err => {
      console.log(err);
  });;
  };

    exports.getCart = (req, res, next) => {
      Cart.getCart(cart => {
        Product.fetchAll(products => {
          const cartProducts = [];
          for (product of products) {
            const cartProductData = cart.products.find(prod=> prod.id === product.id);
            if (cartProductData){
                cartProducts.push({productData: product, qty: cartProductData.qty });
            }
          }
          res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Votre panier',
                products: cartProducts
              });
        });
        
      });
      
    };

    exports.postCart = (req, res, next) => {
      const prodId = req.body.productId;
      Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
      });
      res.redirect('/cart');
    };

    exports.postCartDelete = (req, res, next) => {
      const prodId = req.body.productId;
      Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
      });
      res.redirect('/cart');
    };
    
    exports.getOrders = (req, res, next) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Vos commandes'
      })
    }

    exports.getCheckout = (req, res, next) => {
      res.render('shop/chekout', {
        path: '/chekout',
        pageTitle: 'Paiement'
      });
    
  };