import Partido from "../models/partido.model.js";

class PartidoRepository {

    async getAll() {
        return await Partido.find().populate('fk_user_id', 'nombre email');
    }

    async getById(partido_id) {
        return await Partido.findById(partido_id).populate('fk_user_id', 'nombre email');
    }

    async deleteById(partido_id) {
        return await Partido.findByIdAndDelete(partido_id);
    }

    async getByUserId(user_id) {
        return await Partido
            .find({ fk_user_id: user_id })
            .populate('fk_user_id', 'nombre email');
    }

    async updateById(partido_id, update_data) {
        return await Partido.findByIdAndUpdate(
            partido_id,
            update_data,
            { returnDocument: 'after' }
        );
    }

    async create(fk_user_id, ubicacion, maxJugadores, fecha_hora) {
        return await Partido.create({
            fk_user_id,
            ubicacion,
            maxJugadores,
            fecha_hora,
        });
    }
}

const partidoRepository = new PartidoRepository();
export default partidoRepository;