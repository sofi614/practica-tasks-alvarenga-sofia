import { body } from "express-validator";

export const createTagValidation = [
    body("name")
        .isString()
        .withMessage("name debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("name no puede estar vacío")
        .isLength({ max: 50 })
        .withMessage("name no puede superar los 50 caracteres"),
    body("taskIds")
        .isArray({ min: 1 })
        .withMessage("taskIds debe ser un arreglo con al menos una tarea"),
    body("taskIds.*")
        .isInt({ min: 1 })
        .withMessage("cada taskId debe ser un entero positivo")
];