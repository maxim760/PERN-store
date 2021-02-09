import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { store, useAppDispatch } from "./store/store";
import { AppRouter, AppNavbar, Loader } from "./components";
import { UserApi } from "./services/api/userApi";
import { ROUTES } from "./utils/consts";
import { setUser } from "./store/ducks/user/slice";
import { useAuth } from "./hooks/useAuth";

function App() {
  const dispatch = useAppDispatch()
  const {handleSetAuthFalse, handleSetAuthTrue} = useAuth();
  const [pageLoading, setPageLoading] = React.useState(true);
  React.useLayoutEffect(() => {
    async function checkUser() {
      const dataUser = await UserApi.check();
      if (!dataUser) {
        handleSetAuthFalse()
      } else {
        dispatch(setUser(dataUser))
        handleSetAuthTrue();
      }
      setPageLoading(false);
    }
    checkUser()
  }, []);

  if (pageLoading) {
    return (
      <div className="vw-100 vh-100 d-flex align-items-center justify-content-center flex-column">
        <Loader />
        <h2 className="mt-4">Загрузка страницы</h2>
      </div>
    );
  }

  return (
    <>
      <AppNavbar />
      <AppRouter />
    </>
  );
}

export default App;
