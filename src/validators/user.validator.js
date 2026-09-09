import { body, param } from "express-validator";

const userFields = [
    body("name")
        .isString()
        .withMessage("name debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("name no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("name no puede superar los 100 caracteres"),
    body("email")
        .isEmail()
        .withMessage("email debe ser un correo válido")
        .normalizeEmail()
        .isLength({ max: 100 })
        .withMessage("email no puede superar los 100 caracteres"),
    body("password")
        .isString()
        .withMessage("password debe ser una cadena")
        .notEmpty()
        .withMessage("password no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("password no puede superar los 100 caracteres")
];

export const createUserValidation = userFields;

export const updateUserValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El id del usuario debe ser un entero positivo"),
    body("name")
        .optional()
        .isString()
        .withMessage("name debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("name no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("name no puede superar los 100 caracteres"),
    body("email")
        .optional()
        .isString()
        .withMessage("email debe ser una cadena")
        .trim()
        .notEmpty()
        .withMessage("email no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("email no puede superar los 100 caracteres"),
    body("password")
        .optional()
        .isString()
        .withMessage("password debe ser una cadena")
        .notEmpty()
        .withMessage("password no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("password no puede superar los 100 caracteres")
];