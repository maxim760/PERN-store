import { body } from "express-validator";

export const registrationValidator = [
  body("password", "Введите пароль")
    .isLength({ min: 8 })
    .withMessage("Минимальная длина пароля - 8 символов.")
    .matches(/^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){0,}$/)
    .withMessage("Пароль должен содержать буквы разных регистров и цифры"), // чтобы сообщение не выдавалось когда
  // условия выполнены а не верна только длина (поэтому 0 в квадр. скобках)
  body("email", "Введите почту")
    .matches(/^[^@]+@[^@]+\.[^@]+$/)
    .withMessage("Такой почты не существует")
];
