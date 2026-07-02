import ENVIRONMENT from "../config/environment.config.js";
import ServerError from "../helpers/serverError.helper.js";
import userRepository from "../repositories/user.repository.js";
import usuarioPartidoRepository from "../repositories/usuarioPartido.repository.js";
import jwt from 'jsonwebtoken'
import mailService from "./mail.service.js";
import partidoRepository from "../repositories/partido.repository.js";

class UsuarioPartidoService {
    async inviteUser(user_invited_for_id, user_invited_email, partido_id,) {
        const partidoInvitado = partido_id;
        const userToInvite = await userRepository.getByEmail(user_invited_email);
        const partido = await partidoRepository.getById(partidoInvitado);

        if (!userToInvite) {
            throw new ServerError("El usuario ingresado no existe en el sistema", 404);
        }

        await this.verifyAlreadyMember(partidoInvitado, userToInvite._id)

        const member_created = await this.createMember(
            userToInvite._id,
            partidoInvitado,
        )

        const invitation_token = jwt.sign(
            {
                member_id: member_created._id
            },
            ENVIRONMENT.JWT_SECRET,
        );

        const accept_url = `${ENVIRONMENT.URL_BACKEND}/api/partido/${partido_id}/members/aceptado?invitation_token=${invitation_token}`;
        const reject_url = `${ENVIRONMENT.URL_BACKEND}/api/partido/${partido_id}/members/rechazado?invitation_token=${invitation_token}`;

        await mailService.sendInvitationMemberEmail(userToInvite.email, accept_url, reject_url, partido)
    }

    async memberDesicion(invitation_token, decision) {
        const decoded = jwt.verify(invitation_token, ENVIRONMENT.JWT_SECRET);

        const member_created = await usuarioPartidoRepository.getById(decoded.member_id);
        if (!member_created) {
            throw new ServerError("Invitación no encontrada", 404);
        }

        if (member_created.aceptado !== "pendiente") {
            throw new ServerError("Esta invitación ya fue procesada anteriormente", 400);
        }

        if (decision === "aceptado") {
            await usuarioPartidoRepository.updateById(
                member_created._id,
                { aceptado: "aceptado" }
            );
        }

        if (decision === "rechazado") {
            await usuarioParidoRepository.updateById(
                member_created._id,
                { aceptado: "rechazado" }
            );
        }
    }

    async verifyAlreadyMember(partido_id, user_id) {

        const partidoInvitado = partido_id;
        const invitadoID = user_id

        const isInvitedAlreadyMember = await usuarioPartidoRepository.getByUserAndPartidoId(partidoInvitado, invitadoID);
        if (isInvitedAlreadyMember) {
            if (isInvitedAlreadyMember.acepado === "aceptado") {
                throw new ServerError("El usuario ya es un miembro del espacio de trabajo", 400);
            }
            if (isInvitedAlreadyMember.aceptado === "pendiente") {
                throw new ServerError("Ya has enviado una invitacion al usuario", 400);
            }
            if (isInvitedAlreadyMember.aceptado === "rechazado") {
                throw new ServerError("El usuario ha rechazado la invitacion", 400);
            }
        }
    }

    async createMember(user_id, partido_id, aceptado) {

        const new_member = await usuarioPartidoRepository.create(
            user_id,
            partido_id,
            aceptado
        );
        return new_member
    }

    async removeMember(partidoId, userId) {
        const miembro = await usuarioPartidoRepository.deleteMember(
            partidoId,
            userId
        );

        if (!miembro) {
            throw new ServerError("El usuario no pertenece al partido", 404);
        }

        return miembro;
    }

}

const usuarioPartidoService = new UsuarioPartidoService();
export default usuarioPartidoService