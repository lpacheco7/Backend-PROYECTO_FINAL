import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import express from "express";
import dns from 'dns';
import cors from 'cors'
import authMiddleware from "./middlewares/auth.middleware.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.router.js";
import partidoRouter from "./routes/partido.router.js";

if (ENVIRONMENT.MODE === 'development') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

connectMongoDB()

const app = express();
const PORT = ENVIRONMENT.PORT;

console.log("https://frontend-proyecto-final-two.vercel.app");
console.log("ENVIRONMENT.URLFRONTEND:", ENVIRONMENT.URL_FRONTEND);
app.use(cors({
    origin: "https://frontend-proyecto-final-two.vercel.app"
}));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/partido', partidoRouter)

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

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});