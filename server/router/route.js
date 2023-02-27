import express from "express";
import { loginUser } from "./controller/loginUser.js";
const router = express.Router();


router.post('/', loginUser)


export default router