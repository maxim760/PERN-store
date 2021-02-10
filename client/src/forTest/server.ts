import { rest } from "msw"

import { setupServer } from "msw/node";
import { allHandlers } from "./handlers";

export const handlers = allHandlers

const server = setupServer(...handlers);

export {server}