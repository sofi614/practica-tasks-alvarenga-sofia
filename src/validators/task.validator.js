import { body, param } from "express-validator";

export const createTaskValidation = [
    body("title")
        .isString()
        .withMessage("title debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("title no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("title no puede superar los 100 caracteres"),
    body("description")
        .isString()
        .withMessage("description debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("description no puede estar vacía")
        .isLength({ max: 100 })
        .withMessage("description no puede superar los 100 caracteres"),
    body("isComplete")
        .optional()
        .isBoolean()
        .withMessage("isComplete debe ser un valor booleano"),
    body("userId")
        .isInt({ min: 1 })
        .withMessage("userId es obligatorio y debe ser un entero positivo")
];

export const updateTaskValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El id de la tarea debe ser un entero positivo"),
    body("title")
        .optional()
        .isString()
        .withMessage("title debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("title no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("title no puede superar los 100 caracteres"),
    body("description")
        .optional()
        .isString()
        .withMessage("description debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("description no puede estar vacía")
        .isLength({ max: 100 })
        .withMessage("description no puede superar los 100 caracteres"),
    body("isComplete")
        .optional()
        .isBoolean()
        .withMessage("isComplete debe ser un valor booleano"),
    body("userId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("userId debe ser un entero positivo")
];