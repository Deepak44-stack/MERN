import Product from "../model/Product.js";


const getProducts = async (req, res) => {
    const products = await Product.find().populate("user", "name email");
    res.send(products);
};


const addProduct = async (req, res) => {
    const { name, price, description, category, brand, image, countInStock } = req.body;

    const newProduct = {
        name,
        price,
        description,
        category,
        brand,
        image,
        countInStock,
        user: req.user._id,
    };

    const product = await Product.create(newProduct);

    res.status(201).send({ message: "Product added successfully!", product });
};


const getProductById = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ error: "Product not found " });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;

    const { name, price, category, brand, image, description, countInStock } = req.body;

    const product = await Product.findById(id);

    if (!product)
        return res.status(404).send({ error: "Product not found " });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.image = image ?? product.image;
    product.description = description ?? product.description;
    product.countInStock = countInStock ?? product.countInStock;

    await product.save();

    res.send({ message: "Product Updated" });
};


const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).send({
            error: "There is no such product "
        });
    } else {
        res.send({
            message: "The product has been deleted"
        });
    }
};


export {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
