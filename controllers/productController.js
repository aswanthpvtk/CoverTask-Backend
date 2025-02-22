const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("✅ Retrieved Products:", products);
        res.json(products);
    } catch (err) {
        console.error("❌ Error getting products:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, status, returnPrice, dateAdded } = req.body;
        
        console.log("📩 Received Data:", req.body);

        const newProduct = new Product({
            name,
            price,
            status,
            returnPrice,
            dateAdded // Store as "YYYY-MM-DD"
        });

        await newProduct.save();
        console.log("✅ Product Saved:", newProduct);

        res.status(201).json(newProduct);
    } catch (err) {
        console.error("❌ Error saving product:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.warn("⚠️ Product Not Found:", req.params.id);
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("❌ Error getting product by ID:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { dateAdded, ...updateData } = req.body;
        if (dateAdded) {
            updateData.dateAdded = dateAdded;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) {
            console.warn("⚠️ Product Not Found for Update:", req.params.id);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log("✅ Product Updated:", updatedProduct);
        res.json(updatedProduct);
    } catch (err) {
        console.error("❌ Error updating product:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            console.warn("⚠️ Product Not Found for Deletion:", req.params.id);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log("🗑️ Product Deleted:", deletedProduct);
        res.json({ message: "Product deleted", deletedProduct });
    } catch (err) {
        console.error("❌ Error deleting product:", err.message);
        res.status(500).json({ message: err.message });
    }
};
