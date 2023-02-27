import express from "express";
import { loginUser } from "./controller/loginUser.js";
const router = express.Router();



router.get('/', loginUser)


export default router