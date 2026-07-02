import partidoRepository from "../repositories/partido.repository.js";
import usuarioPartidoRepository from "../repositories/usuarioPartido.repository.js";
import usurioPartidoService from "../services/usuarioPartido.service.js";

class PartidoController {

    async create(req, res) {
        const { ubicacion, maxJugadores, fecha_hora } = req.body;
        const user_id = req.user.id;

        if (!ubicacion || !maxJugadores || !fecha_hora) {
            return res.status(400).json({
                ok: false,
                message: "Faltan datos",
                status: 400
            });
        }

        if (maxJugadores < 2) {
            return res.status(400).json({
                ok: false,
                message: "El partido debe tener al menos 2 jugadores",
                status: 400
            });
        }

        const newPartido = await partidoRepository.create(user_id, ubicacion, maxJugadores, fecha_hora);

        const member_created = await usurioPartidoService.createMember(
            user_id,
            newPartido.id,
            "aceptado"
        )

        return res.status(201).json({
            message: "Partido creado con éxito",
            ok: true,
            status: 201,
            data: {
                partido: {
                    id: newPartido._id,
                    ubicacion: newPartido.ubicacion,
                    maxJugadores: newPartido.maxJugadores,
                    fecha_hora: newPartido.fecha_hora,
                }
            }
        });
    }

    async getAllByUser(req, res) {
        const user_id = req.user.id;
        const partidos = await partidoRepository.getByUserId(user_id);

        return res.status(200).json({
            ok: true,
            message: "Partidos obtenidos",
            data: {
                partidos
            }
        });
    }

    async deleteById(req, res) {
        const { partido_id } = req.params;

        const partido = await partidoRepository.getById(partido_id);

        if (!partido) {
            return res.status(404).json({
                ok: false,
                message: "Partido no encontrado",
                status: 404
            });
        }

        await partidoRepository.deleteById(partido_id);


        return res.status(200).json({
            message: "Partido eliminado exitosamente",
            ok: true,
            status: 200,
            data: {
                partido_eliminado: partido
            }
        });
    }

    async updateById(req, res) {
        const { partido_id } = req.params;
        const { cancha, ubicacion, fecha_hora } = req.body;

        const updated_info = {};
        if (cancha) updated_info.cancha = cancha;
        if (ubicacion !== undefined) updated_info.ubicacion = ubicacion;
        if (fecha_hora) updated_info.fecha_hora = fecha_hora;

        const updated_partido = await partidoRepository.updateById(partido_id, updated_info);

        if (!updated_partido) {
            return res.status(404).json({
                ok: false,
                message: "Partido no encontrado",
                status: 404
            });
        }

        return res.status(200).json({
            message: "Partido actualizado exitosamente",
            ok: true,
            status: 200,
            data: {
                partido: updated_partido
            }
        });
    }
}

const partidoController = new PartidoController();
export default partidoController;