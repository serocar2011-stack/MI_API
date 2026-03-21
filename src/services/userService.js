import { checkModelExist } from '../helpers/checkExist.js'
import User from "../models/userModel.js"

export const createUserService = async (userData) => {
    const {email} = userData
    console.log({userData})
    const response = await checkModelExist(User, {email}, false, 400, `User with email ${email} already exist`)
    console.log({response})
    const newUser = new User(userData)
    const savedUser = await newUser.save()
    return savedUser
    // luego quitar contraseña
}

export const getUserService = async () => {
    // -password no muestra password en la respuesta
    const users = await User.find().select("-password")
    return users
}


export const deleteUserService = async (id) => {
    await checkModelExist(User, {_id: id}, true, 400, `User not found`)

    const deletedUser = await User.findByIdAndDelete(id)

    return { message: "User deleted", data: deletedUser }
}