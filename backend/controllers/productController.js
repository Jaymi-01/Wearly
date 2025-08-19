import {redis} from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Products fetching controller error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products")
    if (featuredProducts) {
      return res.json({ products: JSON.parse(featuredProducts) });
    }
    //fetch from mongoDb
    //.lean() returns a plain js obj instead of mongoDB obj
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    //store in redis
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json({ products: featuredProducts });
  } catch (error) {
    console.error("Featured products fetching controller error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = await Product.create({
      name,
      price,
      description,
      image: cloudinaryResponse?.secure_url || "",
      category,
    });
    res.status(201).json({ product }); 
  } catch (error) {
    console.error("Product creation controller error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}