import { body, param } from "express-validator";

export const profileIdValidation = [
    param("id").isInt({ min: 1 }).withMessage("El id debe ser un entero positivo")
];

export const createProfileValidation = [
    body("bio")
        .optional()
        .isString()
        .withMessage("bio debe ser una cadena")
        .isLength({ max: 255 })
        .withMessage("bio no puede superar los 255 caracteres"),
    body("phoneNumber")
        .optional()
        .isString()
        .withMessage("phoneNumber debe ser una cadena")
        .isLength({ max: 30 })
        .withMessage("phoneNumber no puede superar los 30 caracteres"),
    body("userId")
        .isInt({ min: 1 })
        .withMessage("userId es obligatorio y debe ser un entero positivo")
];

export const updateProfileValidation = [
    ...profileIdValidation,
    body("bio")
        .optional()
        .isString()
        .withMessage("bio debe ser una cadena")
        .isLength({ max: 255 })
        .withMessage("bio no puede superar los 255 caracteres"),
    body("phoneNumber")
        .optional()
        .isString()
        .withMessage("phoneNumber debe ser una cadena")
        .isLength({ max: 30 })
        .withMessage("phoneNumber no puede superar los 30 caracteres"),
    body("userId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("userId debe ser un entero positivo")
];