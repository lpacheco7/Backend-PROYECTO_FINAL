import mongoose from "mongoose";

const partidoSchema = new mongoose.Schema(
    {
        fk_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        
        ubicacion: {
            type: String,
            default: false
        },

        maxJugadores: {
            type: Number,
            required: true
        },

        fecha_hora: {
            type: Date,
            default: Date.now,
            required: true
        },
    },
);


const Partido = mongoose.model('Partido', partidoSchema);
export default Partido