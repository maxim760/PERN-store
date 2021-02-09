import React from "react";
import {useSelector} from "react-redux"
import { Route, Switch, Redirect } from "react-router-dom";
import { ROUTES } from "../utils/consts";
import { publicRoutes, authRoutes } from "../routes";
import { selectUserIsAuth } from "../store/ducks/user/selector";

interface AppRouterProps {}

export const AppRouter: React.FC<AppRouterProps> = ({}): React.ReactElement => {
  const isAuth = useSelector(selectUserIsAuth);
  return (
    <Switch>
        {isAuth &&
          authRoutes.map(({ isExact, ...props }) => (
            <Route key={props.path} exact={isExact} {...props} />
          ))}
        {publicRoutes.map(({ isExact, ...props }) => (
          <Route key={props.path} exact={isExact} {...props} />
        ))}
      <Redirect to={ROUTES.SHOP_ROUTE} />
    </Switch>
  );
};
