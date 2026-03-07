import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({

name:{
    type: String,
    required: true,
    maxLength: [40, "Please keep name field under 40 characters"],
    minLength: [2, "Please keep name field above 2 characteres"],
    trim: true,
    lowercase: true,
    unique: true,
},

lastName: {
    type: String,
    required: true,
    maxLength: [40, "Please keep name field under 40 characters"],
    minLength: [2, "Please keep name field above 2 characteres"],
    trim: true,
    lowercase: true,
    unique: true,
},

email:{
    type: String,
    required: true,
    maxLength: [40, "Please keep name field under 40 characters"],
    minLength: [2, "Please keep name field above 2 characteres"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please, use a valid email"]
},

pasword: {
    type: String,
     match:[ /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/, "debe contener un numero, mayúscula entre 6 y 16 caracteres"],
     required: true

}


}, 
{timestamps: true})

export default mongoose.model()