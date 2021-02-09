import { Shop, Admin, DevicePage, Auth, Basket } from "./pages";
import { ROUTES } from "./utils/consts";

type IRoute = {
  path: string;
  component: React.FC;
  isExact: boolean;
};

export const authRoutes: IRoute[] = [
  { path: ROUTES.ADMIN_ROUTE, component: Admin, isExact: false },
  { path: ROUTES.BASKET_ROUTE, component: Basket, isExact: false },
];

export const publicRoutes: IRoute[] = [
  { path: ROUTES.SHOP_ROUTE, component: Shop, isExact: true },
  { path: ROUTES.DEVICE_ROUTE + "/:id", component: DevicePage, isExact: false },
  { path: ROUTES.LOGIN_ROUTE, component: Auth, isExact: false },
  { path: ROUTES.REGISTRATION_ROUTE, component: Auth, isExact: false },
];
