import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ROUTES } from "../utils/consts";
import { useAuthPage } from "../hooks/useAuthPage";

import { isValidPassword } from "../utils/isValidPassword";
import {
  fetchLoginUser,
  setAuthError,
  setAuthStatusNever,
  fetchRegisterUser,
  setAuthStatusLoading,
} from "../store/ducks/user/slice";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import {
  selectUserAuthError,
  selectUserAuthStatus,
} from "../store/ducks/user/selector";
import { Loader, ErrorAlert } from "../components";

export const Auth = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const error = useSelector(selectUserAuthError);
  const { isLoading, isNever, isSuccess, isError } = useSelector(
    selectUserAuthStatus
  );
  const isRegister = location.pathname.startsWith(ROUTES.REGISTRATION_ROUTE);
  const {
    password,
    email,
    handleChangePassword,
    handleChangeEmail,
  } = useAuthPage();
  const [isCheckedOpenPassword, setIsCheckedOpenPassword] = React.useState(
    false
  );
  const handleToggleCheck = () => setIsCheckedOpenPassword((prev) => !prev);
  const handleCloseAlert = () => dispatch(setAuthError(null));
  React.useEffect(() => {
    if (isSuccess) {
      if (isRegister) {
        dispatch(setAuthStatusNever());
        history.push(ROUTES.LOGIN_ROUTE);
      } else {
        //is login
        history.push(ROUTES.SHOP_ROUTE);
      }
    }
    return () => {
      dispatch(setAuthStatusNever());
    };
  }, [isSuccess, isRegister]);

  const handleAuthorize = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setAuthStatusLoading());
    const passwordMsg = isValidPassword(password);
    console.log(passwordMsg)
    if (typeof passwordMsg === "string") {
      console.log("in")
      dispatch(setAuthError(passwordMsg));
      return;
    }
    if (isRegister) {
      dispatch(fetchRegisterUser({ password, email }));
    } else {
      dispatch(fetchLoginUser({ password, email }));
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="center">{isRegister ? "Регистрация" : "Авторизация"}</h2>
        <Form
          className="d-flex align-items-center flex-column appForm"
          onSubmit={handleAuthorize}
        >
          <Form.Control
            placeholder="Введите e-mail"
            value={email}
            type="email"
            required
            onChange={handleChangeEmail}
          />
          <Form.Control
            placeholder="Введите пароль"
            value={password}
            required
            type={isCheckedOpenPassword ? "text" : "password"}
            onChange={handleChangePassword}
          />

          <Form.Label className="labelCheck">
            <Form.Control
              type="checkbox"
              className="checkbox"
              checked={isCheckedOpenPassword}
              onChange={handleToggleCheck}
            />
            <p className="d-flex">Показать пароль</p>
          </Form.Label>
          <Row className="d-flex justify-content-between align-items-center w-100">
            {isRegister ? (
              <div>
                Есть аккаунт?&nbsp;
                <Link to={ROUTES.LOGIN_ROUTE}>Войдите</Link>
              </div>
            ) : (
              <div>
                Нет аккаута?&nbsp;
                <Link to={ROUTES.REGISTRATION_ROUTE}>Зарегистрируйтесь</Link>
              </div>
            )}
            <Button
              disabled={isLoading}
              type="submit"
              className="mt-7 ml-auto"
              variant="outline-success"
            >
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Row>
          {isLoading && (
            <Row className="d-flex justify-content-center align-items-center">
              <span className="mr-2">Подождите..</span>
              <Loader />{" "}
            </Row>
          )}
        </Form>
      </Card>
      {error !== null && isError && (
        <ErrorAlert error={error} onClose={handleCloseAlert} />
      )}
    </Container>
  );
};
