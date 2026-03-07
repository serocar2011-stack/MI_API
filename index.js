import express from "express"
import { PORT } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"
import productRouter from "./src/routes/productRoutes.js"
import clienteRoutes from "./src/routes/clienteRoutes.js"
import categoryRoutes from "./src/routes/categoryRouter.js"


    const app =express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    connectDB()

    app.use ("/api/products", productRouter)
    app.use("/api/clientes", clienteRoutes)
    app.use("/api/categories", categoryRoutes)
    


    app.listen(PORT,()=>{
        console.log(`Server is running in port ${PORT}`)

    })