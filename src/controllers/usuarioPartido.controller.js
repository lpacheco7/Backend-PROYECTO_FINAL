import ServerError from "../helpers/serverError.helper.js";
import usuarioPartidoService from "../services/usuarioPartido.service.js";

class UsuarioPartidoController {

    // El creador del partido invita a un usuario por email
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

    // El invitado acepta o rechaza la invitación via token en el link del email
    async processInvitation(request, response) {
        const { decision } = request.params;           // 'Aceptado' o 'Rechazado'
        const { invitation_token } = request.query;    // ?invitation_token=...

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

    // Lista todos los jugadores de un partido
    async getJugadoresByPartido(request, response) {
        const { partido_id } = request.params;

        const jugadores = await usuarioPartidoService.getJugadoresByPartido(partido_id);

        return response.status(200).json({
            ok: true,
            message: "Jugadores obtenidos",
            data: { jugadores }
        });
    }

    // Lista todos los partidos a los que pertenece el usuario logueado
    async getPartidosByUser(request, response) {
        const { id: user_id } = request.user;

        const partidos = await usuarioPartidoService.getPartidosByUser(user_id);

        return response.status(200).json({
            ok: true,
            message: "Partidos del usuario obtenidos",
            data: { partidos }
        });
    }

    // El creador elimina a un jugador del partido
    async removeJugador(request, response) {
        const { partido_id, user_id } = request.params;
        const { id: creador_id } = request.user;

        await usuarioPartidoService.removeJugador(creador_id, partido_id, user_id);

        return response.status(200).json({
            ok: true,
            message: "Jugador eliminado del partido"
        });
    }
}

const usuarioPartidoController = new UsuarioPartidoController();
export default usuarioPartidoController;