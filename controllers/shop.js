const Product = require('../models/product');
const Cart = require('../models/cart');

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