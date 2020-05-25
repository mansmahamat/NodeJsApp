const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Tout les produits',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
    
};


exports.getOneProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail',{
      pageTitle: 'product.title',
      path: '/products',
      product : product
    })
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

    exports.postCart = (req, res, next) => {
      const prodId = req.body.productId;
      console.log(prodId);
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