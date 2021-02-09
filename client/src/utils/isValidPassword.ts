export const isValidPassword = (password: string) => {
  const regex = /^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){8,}$/;
  return regex.test(password) ? true : "Минимальная длина пароля - 8 символов, а сам пароль должен содержать буквы разных регистров и цифры"
};
