import { deviceHandlers } from "./device";
import { userHandlers } from "./user";
import { typeHandlers } from "./type";
import { brandHandlers } from "./brands";

const allHandlers = [
  ...deviceHandlers,
  ...userHandlers,
  ...typeHandlers,
  ...brandHandlers
]

export { allHandlers };
