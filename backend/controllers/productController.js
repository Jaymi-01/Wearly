import Product from "../models/productModel";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Products fetching controller error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
