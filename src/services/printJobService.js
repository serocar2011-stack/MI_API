import { PrintJob } from "../models/printJobModel.js"

export const createPrintJobService = (data) => {
  return PrintJob.create(data)
}

export const getAllPrintJobsService = () => {
  return PrintJob.find().populate("cliente") .populate("files")
}

export const getPrintJobByIdService = (id) => {
  return PrintJob.findById(id).populate("cliente")
}

export const updatePrintJobService = (id, data) => {
  return PrintJob.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

export const deletePrintJobService = (id) => {
  return PrintJob.findByIdAndDelete(id)
}