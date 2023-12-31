import { ValidationError } from "sequelize";

export default (err, req, res, next) => {
    if (err instanceof ValidationError) {
        // Manejo de errores de validación de Sequelize
        return res.status(400).json({ error: "Validation Error", message: err.message, fields: err.errors });
    } else if (err.name === "UnauthorizedError") {
        // Manejo de errores de autenticación (por ejemplo, JWT)
        return res.status(401).json({ error: "Unauthorized", message: "Unauthorized access" });
    } else {
        // Manejo de otros errores
        console.error("Unhandled error:", err);
        return res.status(500).json({ error: "Internal Server Error", message: "Something went wrong" });
    }
};
