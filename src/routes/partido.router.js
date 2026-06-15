import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import partidoController from '../controllers/partido.controller.js';
import usuarioPartidoController from "../controllers/usuarioPartido.controller.js";


const partidoRouter = express.Router();

partidoRouter.get(
    '/:partido_id/members/:decision',
    usuarioPartidoController.processInvitation
);

partidoRouter.use(authMiddleware);

partidoRouter.post(
    '/create',
    partidoController.create
);

partidoRouter.get(
    '/getallbyuser',
    partidoController.getAllByUser
);

partidoRouter.delete(
    '/delete/:partido_id',
    partidoController.deleteById
)

partidoRouter.put(
    '/update/:partido_id',
    partidoController.updateById
)

partidoRouter.post(
    '/:partido_id/members',
    usuarioPartidoController.inviteUser
);

export default partidoRouter