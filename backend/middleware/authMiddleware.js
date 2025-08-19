import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware logic to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no access token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized, token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.error("protectRoute middleware error:", error.message);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};


// Middleware logic to restrict access to admin users
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin"){
    next();
  } else {
    res.status(403).json({ message: "Forbidden, admin access required" });
  }
};
