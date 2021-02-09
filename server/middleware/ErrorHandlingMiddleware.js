import ApiError from "../error/ApiError.js";

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    const { status, message } = error;
    res.status(status).json({ message });
    return;
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
}
