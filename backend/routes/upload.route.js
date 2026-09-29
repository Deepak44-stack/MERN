import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_KEY,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {

    console.log("FILE NAME:", file.originalname);
    console.log("FILE MIME TYPE:", file.mimetype);

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    const extension = file.originalname
        .toLowerCase()
        .substring(file.originalname.lastIndexOf("."));

    if (
        file.mimetype.startsWith("image/") ||
        allowedExtensions.includes(extension)
    ) {
        cb(null, true);
    } else {
        cb(new Error("only Image file Allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                message: "No image file uploaded",
            });
        }

        console.log("Uploading to Cloudinary...");

        const resp = await cloudinary.uploader.upload(req.file.path, {
            folder: "himalayanshop",
        });

        console.log("Cloudinary upload successful");
        console.log("Cloudinary URL:", resp.secure_url);

        res.send({
            message: "Image uploaded successfully",
            image: resp.secure_url,
        });

    } catch (error) {
        console.log("CLOUDINARY ERROR:", error);

        res.status(500).send({
            message: "Cloudinary upload failed",
            error: error.message,
        });
    } finally {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
    }
});

export default router;
