
import { createFullPrintJobService, getPrintJobByIdService } from "../services/printJobService.js"

export const createFullPrintJobController = async (req, res) => {
  try {
    const result = await createFullPrintJobService(req.body)

    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

import { getAllPrintJobsService } from "../services/printJobService.js"

export const getAllFullPrintJobsController = async (req, res) => {
  try {
    const result = await getAllPrintJobsService()

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


export const getFullPrintJobByIdController = async (req, res) => {
  try {
    const { id } = req.params

    const result = await getPrintJobByIdService(id)

    if (!result) {
      return res.status(404).json({
        message: "PrintJob no encontrado"
      })
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}