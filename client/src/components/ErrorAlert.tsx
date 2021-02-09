import React from "react";
import { IAuthError } from "../store/ducks/user/types";
import Alert from "react-bootstrap/esm/Alert";
import { error } from "console";

type ErrorAlertProps = {
  error: IAuthError;
  onClose?(): void;
};

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onClose,
}): React.ReactElement | null => {
  const [show, setShow] = React.useState(true);
  const onHide = () => setShow(false)
  if (!error || !show) {
    return null;
  }
  return (
    <Alert
      dismissible
      className="mt-4 mr-auto ml-auto"
      style={{ maxWidth: 600 }}
      variant={"danger"}
      onClose={onClose || onHide}
    >
      {typeof error === "string" ? (
        <p>{error}</p>
      ) : (
        <>
          <Alert.Heading className="left-align">
            Ошибка {error.status}
          </Alert.Heading>
          <hr className="mt-2 mb-2" />
          <p>{error.message}</p>
        </>
      )}
    </Alert>
  );
};
