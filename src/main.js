import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import express from "express";
import dns from 'dns';
import authRouter from "./routes/auth.router.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import workspaceRouter from "./routes/workspace.router.js";
import cors from 'cors'

if (ENVIRONMENT.MODE === 'development') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

connectMongoDB()

const app = express();
const PORT = ENVIRONMENT.PORT;


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/workspace', workspaceRouter)

app.get(
    '/api/profile',
    authMiddleware,
    (request, response) => {
        console.log(
            'Nombre del cliente:',
            request.user.nombre
        )
        return response.json({
            ok: true,
            status: 200,
            message: "Estas autenticado"
        })
    }
)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});