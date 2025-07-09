import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		return res.status(401).json({ message: "You are not authenticated" });
	}

	jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
		if (err) {
			return res.status(403).send("Invalid token");
		}
		const { role } = req.body;
		if (role === "admin") {
			if (payload.role !== "superadmin") {
				return res.status(403).send("Unauthorized to create an admin");
			}
		}
		if (role === "cashier") {
			if (payload.role !== "admin") {
				return res.status(403).send("Unauthorized to create a cashier");
			}
		}
		req.userId = payload.userId;
		next();
	});
};

export const authenticateToken = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ message: "You are not authenticated" });
		}

		const decoded = jwt.verify(token, process.env.JWT_KEY);

		// Get user details from database
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Authentication error:", error);
		return res.status(403).json({ message: "Invalid token" });
	}
};
