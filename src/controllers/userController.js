import { createUserService, getUserService, deleteUserService } from "../services/userService.js"
import {handleError} from "../utils/errorHandler.js"


export const createUser = async (req, res) => {
    try {
        const userData = req.body
        const newUser = await createUserService(userData)   
        res.status(201).json({message: "User created", data:newUser})

    } catch (error) {
        handleError(error, res)
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await getUserService()
        res.status(200).json(users)
        

    } catch (error) {
        handleError(error, res)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deleteUser = await deleteUserService(id)
        res.status(201).json(deleteUser)
    }

catch (error) {
         handleError(error, res)
    }
}