import express from "express"
import { createFullPrintJobController, getAllFullPrintJobsController, getFullPrintJobByIdController } from "../controllers/fullPrintJobController.js"


const fullPrintJobRouter = express.Router()

fullPrintJobRouter.post("/", createFullPrintJobController)
fullPrintJobRouter.get("/", getAllFullPrintJobsController)
fullPrintJobRouter.get("/:id", getFullPrintJobByIdController)

export default fullPrintJobRouter