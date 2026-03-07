import express from 'express'
import { createProduct } from '../controllers/productController.js'


const router = express.Router()


// Crear producto 

router.post("/", createProduct)



export default router