import { Router } from "express";

const authRoutes = Router();
authRoutes.post("/signup",signup);
authRoutes.post("/login",login);

export default authRoutes;