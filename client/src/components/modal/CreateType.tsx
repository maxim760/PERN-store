import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useChange } from "../../hooks/useChange";
import { TypeApi } from "../../services/api/typeApi";
import { isErrorType } from "../../services/api/userApi";
import { IAuthError } from "../../store/ducks/user/types";
import { ErrorAlert } from "../ErrorAlert";

interface CreateTypeProps {
  show: boolean;
  onHide(): void;
}

export const CreateType: React.FC<CreateTypeProps> = ({
  show,
  onHide,
}): React.ReactElement | null => {
  const [type, handleChangeType, resetType] = useChange();
  const [error, setError] = React.useState<IAuthError>(null);
  const handleCloseError = () => setError(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("in");

    const response = await TypeApi.create({ name: type.trim() });
    if (!isErrorType(response)) {
      resetType();
      onHide();
      alert(`Тип ${type.trim()} добавлен`);
    } else {
      setError(response.error);
    }
  };
  return (
    <Modal centered show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить тип</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={type}
            onChange={handleChangeType}
            placeholder="Введите название типа"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" type="submit">
            Добавить
          </Button>
        </Modal.Footer>
      </Form>
      {error && <ErrorAlert error={error} onClose={handleCloseError} />}
    </Modal>
  );
};
