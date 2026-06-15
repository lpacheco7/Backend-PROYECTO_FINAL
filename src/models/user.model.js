import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email_verificado: {
            type: Boolean,
            default: false,
            required: true
        },
        fecha_creacion: {
            type: Date,
            required: true,
            default: Date.now
        },
    }
)
const User = mongoose.model('User', userSchema)
export default User