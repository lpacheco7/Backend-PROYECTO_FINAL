import mongoose from "mongoose";

const usuarioPartidoSchema = new mongoose.Schema(
    {
        fk_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },

        fk_partido_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partido',
            required: true
        },

        aceptado: {
            type: String,
            enum: ['aceptado', 'rechazado', 'pendiente'],
            default: 'pendiente',
            required: true
        },
    },
);

const UsuarioPartido = mongoose.model('UsuarioPartido', usuarioPartidoSchema);
export default UsuarioPartido