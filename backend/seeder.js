import mongoose from "mongoose";
import User from "./model/user.js";
import Product from "./model/Product.js";
import Order from "./model/order.js";

import products from "./data/product.js";
import users from "./data/user.js";

mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) =>
        console.log(`connected to db at ${conn.connection.host}`)
    )
    .catch((err) =>
        console.log("error connecting to db", err.message)
    );

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const addedUsers = await User.insertMany(users);

        const adminId = addedUsers[0]._id;

        const productsWithUser = products.map((p) => {
            return {
                ...p,
                user: adminId,
            };
        });

        await Product.insertMany(productsWithUser);

        console.log("Data loaded successfully...");
        process.exit(0);

    } catch (err) {
        console.log("Error loading data:", err.message);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("DB cleared...");
        process.exit(0);

    } catch (err) {
        console.log("Error destroying data:", err.message);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
