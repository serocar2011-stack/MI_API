import express from "express"
import { PORT } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"
import productRouter from "./src/routes/productRoutes.js"
import clienteRoutes from "./src/routes/clienteRoutes.js"
import categoryRoutes from "./src/routes/categoryRouter.js"
import { handleError } from "./src/utils/errorHandler.js"
import printJobRoutes from "./src/routes/printJobRoutes.js"
import fileRoutes from "./src/routes/fileRoutes.js"

    const app =express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    connectDB()

    app.use ("/api/products", productRouter)
    app.use("/api/clientes", clienteRoutes)
    app.use("/api/categories", categoryRoutes)
    app.use("/api/printjobs", printJobRoutes)
    app.use("/api/files", fileRoutes)

    app.use (handleError)

    app.listen(PORT,()=>{
        console.log(`Server is running in port ${PORT}`)

    })