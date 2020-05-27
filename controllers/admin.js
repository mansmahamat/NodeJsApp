const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false
    });
}

 

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, imageUrl, description, price);
    product.save()
    .then( result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
  };

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing : editMode,
        product : product
      });
    });
    
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const uptatedTitle = req.body.title;
  const uptatedImageUrl = req.body.imageUrl;
  const uptatedDescription = req.body.description;
  const uptatedPrice = req.body.price;
  const uptatedProduct = new Product(prodId, uptatedTitle, uptatedImageUrl, uptatedDescription, uptatedPrice);
  uptatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin produits',
          path: '/admin/products'
        });
    });
}
