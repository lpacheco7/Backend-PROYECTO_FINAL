import UsuarioPartido from "../models/usuarioPartido.model.js";

class UsuarioPartidoRepository {

    async getByUserAndPartidoId(user_id, partido_id) {
        return await UsuarioPartido.findOne({
            fk_user_id: user_id,
            fk_partido_id: partido_id,
        });
    }

    async create(user_id, partido_id, aceptado = 'pendiente') {
        return await UsuarioPartido.create({
            fk_user_id: user_id,
            fk_partido_id: partido_id,
            aceptado,
        });
    }

    async getById(usuarioPartido_id) {
        return await UsuarioPartido.findById(usuarioPartido_id);
    }

    async updateById(usuarioPartido_id, update_data) {
        return await UsuarioPartido.findByIdAndUpdate(
            usuarioPartido_id,
            update_data,
            { returnDocument: 'after' }
        );
    }

    async deleteById(usuarioPartido_id) {
        return await UsuarioPartido.findByIdAndDelete(usuarioPartido_id);
    }

    async deleteMember(partidoId, userId) {
        return await UsuarioPartido.findOneAndDelete({
            fk_partido_id: partidoId,
            fk_user_id: userId
        })
    };

    async getByPartidoId(partido_id) {
        const result = await UsuarioPartido
            .find({ fk_partido_id: partido_id })
            .populate('fk_user_id', 'nombre email');

        return result.map((entry) => new JugadorConInfo(entry));
    }

    async getByUserId(user_id) {
        const memberships = await UsuarioPartido
            .find({ fk_user_id: user_id })
            .populate({
                path: 'fk_partido_id',
                select: 'cancha ubicacion fecha_hora fk_user_id',
            });

        return memberships
            .filter((entry) => entry.fk_partido_id)     // descarta partidos eliminados
            .map((entry) => ({
                usuarioPartido_id: entry._id,
                aceptado: entry.aceptado,
                partido_id: entry.fk_partido_id._id,
                partido_cancha: entry.fk_partido_id.cancha,
                partido_ubicacion: entry.fk_partido_id.ubicacion,
                partido_fecha: entry.fk_partido_id.fecha_hora,
            }));
    }
}

const usuarioPartidoRepository = new UsuarioPartidoRepository();
export default usuarioPartidoRepository;


class JugadorConInfo {
    constructor(raw) {
        this.usuarioPartido_id = raw._id;
        this.aceptado = raw.aceptado;
        this.user_id = raw.fk_user_id._id;
        this.user_nombre = raw.fk_user_id.nombre;
        this.user_email = raw.fk_user_id.email;
    }
}