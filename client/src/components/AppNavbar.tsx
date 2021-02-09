import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ROUTES } from "../utils/consts";
import { useSelector } from "react-redux";
import {
  selectUserIsAuth,
  selectUserIsAdmin,
} from "../store/ducks/user/selector";
import { useAuth } from "../hooks/useAuth";

interface AppNavbarProps {}

export const AppNavbar: React.FC<AppNavbarProps> = ({}): React.ReactElement => {
  const history = useHistory();
  const { isAuth, handleSetAuthFalse, handleSetAuthTrue } = useAuth();
  const isAdmin = useSelector(selectUserIsAdmin);

  const handleToAdmin = () => history.push(ROUTES.ADMIN_ROUTE);
  const handleToLogin = () => history.push(ROUTES.LOGIN_ROUTE);
  const handleOutFromPage = () => {
    if (window.confirm("Вы уверены?")) {
      handleSetAuthFalse();
      localStorage.removeItem("token");
      history.push(ROUTES.LOGIN_ROUTE);
    }
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink className={"mainLink"} to={ROUTES.SHOP_ROUTE}>
          BuyDevice
        </NavLink>
        {isAuth ? (
          <Nav className="ml-auto appNav">
            {isAdmin && (
              <Button variant="outline-light" onClick={handleToAdmin}>
                Админ-Панель
              </Button>
            )}
            <Button variant="outline-light" onClick={handleOutFromPage}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={handleToLogin}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
