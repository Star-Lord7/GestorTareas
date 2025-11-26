import jwt from 'jsonwebtoken';
import { isTokenActive } from '../models/token.model.js';

export const verifyToken = async(req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if(!authHeader) return res.status(401).json({
            message: "Necesitas autorización"
        });

        const token = authHeader.split(" ")[1];
        if(!token) return res.status(401).json({
            message: "Formato de autorización es invalido"
        });

        try {
            const isActive = await isTokenActive(token);
            if(!isActive) return res.status(401).json({
                message: "No está autorizado, por favor inicie sesión nuevamente"
            });

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token invalido o expirado"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error, por favor intenta de nuevo",
            error: error
        });
    }
}