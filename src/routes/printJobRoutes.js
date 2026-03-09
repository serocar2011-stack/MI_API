import { Router } from "express"
import {
  createPrintJobController,
  getAllPrintJobsController,
  getPrintJobByIdController
} from "../controllers/printJobController.js"

const router = Router()

router.post("/", createPrintJobController)
router.get("/", getAllPrintJobsController)
router.get("/:id", getPrintJobByIdController)

export default router