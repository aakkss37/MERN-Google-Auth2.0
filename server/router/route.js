import express from "express";
import { ValidateJWT } from "./controller/JWT-validation.js";
import { loginUser } from "./controller/loginUser.js";
const router = express.Router();


router.post('/', loginUser)
router.post('/validate-access-tokan', ValidateJWT)

export default router