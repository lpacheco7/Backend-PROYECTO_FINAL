import ENVIRONMENT from "../config/environment.config.js";
import mailer_transport from "../config/mailer.config.js";
import ServerError from "../helpers/serverError.helper.js";


class MailService {
    async sendInvitationMemberEmail(invited_email, accept_url, reject_url, partido) {
        try {
            await mailer_transport.sendMail({
                from: `"Organizador" <${ENVIRONMENT.GMAIL_USERNAME}>`,
                to: invited_email,
                subject: 'Fuiste invitado a un partido amistoso',
                html: `
                    <div style="font-family: Arial; padding: 20px; text-align: center;">
                        <h2 style="color: #28a745;">⚽ ¡Armamos un partido! ¿Te sumas?</h2>
                        
                        <div>
                            <p><strong>📍 Cancha:</strong>${partido.ubicacion}</p>
                            <p><strong>👥 En una cancha de futbol:</strong>${partido.maxJugadores}</p>
                            <p><strong>📅 Fecha y hora:</strong>${new Date(partido.fecha_hora).toLocaleString("es-AR")}</p>
                        </div>

                        <table role="presentation" align="center" cellspacing="0" cellpadding="0" style="margin: 30px auto;">
                            <tr>
                                <td style="padding-right: 10px;">
                                    <a href="${accept_url}"
                                    style="display: inline-block;
                                            background-color: #28a745;
                                            color: #ffffff;
                                            padding: 12px 20px;
                                            text-decoration: none;
                                            border-radius: 5px;
                                            font-weight: bold;">
                                        ACEPTAR
                                    </a>
                                </td>

                                <td style="padding-left: 10px;">
                                    <a href="${reject_url}"
                                    style="display: inline-block;
                                            background-color: #dc3545;
                                            color: #ffffff;
                                            padding: 12px 20px;
                                            text-decoration: none;
                                            border-radius: 5px;
                                            font-weight: bold;">
                                        RECHAZAR
                                    </a>
                                </td>
                            </tr>
                        </table>
                        
                        <p style="font-size: 14px;">¡No te olvides los botines!</p>
                    </div>
                    `
            });
            console.log("¡Correo de invitación enviado a:", invited_email);
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error
        }
    }
}

const mailService = new MailService()
export default mailService