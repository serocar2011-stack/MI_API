import { Cliente } from "../models/clienteModel.js"
import { PrintJob } from "../models/printJobModel.js"
import { File } from "../models/fileModel.js"
import { calculatePrintJobTotals } from "../utils/calculatePrintJob.js"

export const createFullPrintJobService = async (data) => {
  const { cliente, files } = data

  //  Validación
  if (!cliente || !files || files.length === 0) {
    throw new Error("Cliente y files son requeridos")
  }

  // Buscar cliente existente por email
  let existingCliente = await Cliente.findOne({ email: cliente.email })

  //  Crear cliente si no existe
  if (!existingCliente) {
    existingCliente = await Cliente.create(cliente)
  }

  // Calculo totales usando utils
  const { totalPages, totalPrice } = calculatePrintJobTotals(files)

  // 4. Crear PrintJob
  const newPrintJob = await PrintJob.create({
    cliente: existingCliente._id,
    totalPages,
    totalPrice,
    status: "pending"
  })

  // 5. Preparar files con referencia al printJob
  const filesWithJob = files.map(file => ({
    ...file,
    printJob: newPrintJob._id
  }))

  // 6. Insertar files
  await File.insertMany(filesWithJob)

  // 7. Traer resultado final populado
  const result = await PrintJob.findById(newPrintJob._id)
    .populate("cliente")
    .populate("files")

  return result
}


export const getAllPrintJobsService = async () => {
  return await PrintJob.find()
    .populate("cliente")
    .populate("files")
}


export const getPrintJobByIdService = async (id) => {

  return await PrintJob.findById(id)
    .populate("cliente")
    .populate("files")
}