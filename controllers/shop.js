const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Tout les produit',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
    
};

  exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };

    exports.getCart = (req, res, next) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Votre panier'
      });
    }
    
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