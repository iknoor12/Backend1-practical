const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// POST - Create a new product
exports.createProduct = async (req, res) => {
    const { name, price, category, inStock } = req.body;

    if (!name || !price){
        return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = await Product.create(req.body);
    res.json(product);
}

// UPDATE product
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id);

    if (!product){
        return res.status(404).json({ message: 'Product not found' });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
}

// DELETE product
exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.param.id);

    if (!product){
        return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted' });
}