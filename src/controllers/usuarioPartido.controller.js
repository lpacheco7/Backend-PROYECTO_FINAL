import ServerError from "../helpers/serverError.helper.js";
import usuarioPartidoRepository from "../repositories/usuarioPartido.repository.js";
import usuarioPartidoService from "../services/usuarioPartido.service.js";

class UsuarioPartidoController {

    async inviteUser(request, response) {
        const { partido_id } = request.params;
        const { invited_email } = request.body;
        const { id: creador_id } = request.user;

        if (!invited_email) {
            throw new ServerError("Falta el email del jugador a invitar", 400);
        }

        await usuarioPartidoService.inviteUser(creador_id, invited_email, partido_id);

        return response.status(200).json({
            ok: true,
            message: "Invitación enviada con éxito"
        });
    }

    async processInvitation(request, response) {
        const { decision } = request.params;         
        const { invitation_token } = request.query;

        if (!invitation_token) {
            throw new ServerError("Falta el token de invitación", 400);
        }

        if (decision !== 'aceptado' && decision !== 'rechazado') {
            throw new ServerError("Decisión no válida. Debe ser 'aceptado' o 'rechazado'", 400);
        }

        await usuarioPartidoService.memberDesicion(invitation_token, decision);

        return response.status(200).json({
            ok: true,
            status: 200,
            message: `Decisión '${decision}' procesada con éxito`
        });
    }

    async getJugadoresByPartido(request, response) {
        const { partido_id } = request.params;

        const jugadores = await usuarioPartidoService.getJugadoresByPartido(partido_id);

        return response.status(200).json({
            ok: true,
            message: "Jugadores obtenidos",
            data: { jugadores }
        });
    }

    async getPartidosByUser(request, response) {
        const user_id = request.user.id;
        const partidos = await usuarioPartidoRepository.getByUserId(user_id);

        return response.status(200).json({
            ok: true,
            message: "Partidos del usuario obtenidos",
            data: { partidos }
        });
    }

    async removeJugador(request, response) {
        const { partido_id, user_id } = request.params;
        const { id: creador_id } = request.user;

        await usuarioPartidoService.removeJugador(creador_id, partido_id, user_id);

        return response.status(200).json({
            ok: true,
            message: "Jugador eliminado del partido"
        });
    }

    async removeMember(request, response) {
        const { partido_id } = request.params;
        const { id: userId } = request.user;

        await usuarioPartidoService.removeMember(
            partido_id,
            userId
        );

        return response.status(200).json({
            ok: true,
            message: "Jugador eliminado del partido"
        });
    }
}

const usuarioPartidoController = new UsuarioPartidoController();
export default usuarioPartidoController;