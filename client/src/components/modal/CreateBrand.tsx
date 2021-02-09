import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useChange } from "../../hooks/useChange";
import { BrandApi } from "../../services/api/brandApi";
import { IAuthError } from "../../store/ducks/user/types";
import { isErrorType } from "../../services/api/userApi";
import { ErrorAlert } from "../ErrorAlert";

interface CreateBrandProps {
  show: boolean;
  onHide(): void;
}

export const CreateBrand: React.FC<CreateBrandProps> = ({
  show,
  onHide,
}): React.ReactElement => {
  const [error, setError] = React.useState<IAuthError>(null);
  const handleCloseError = () => setError(null);
  const [brand, handleChangeBrand, resetBrand] = useChange();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await BrandApi.create({ name: brand.trim() });
    if (!isErrorType(response)) {
      resetBrand();
      onHide();
      alert(`Тип ${brand.trim()} добавлен`);
    } else {
      setError(response.error);
    }
  };
  return (
    <Modal centered show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить бренд</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={brand}
            onChange={handleChangeBrand}
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
