import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { CreateDevice, CreateBrand, CreateType } from "../components";
import { useModal } from "../hooks/useModal";

interface AdminProps {}

export const Admin: React.FC<AdminProps> = ({ }): React.ReactElement => {
  const {onShow: showTypeModal, ...typeProps} = useModal()
  const  {onShow: showBrandModal, ...brandProps} = useModal()
  const {onShow: showDeviceModal, ...deviceProps} = useModal()

  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-dark mt-4 p-1" onClick={showTypeModal}>Добавить тип</Button>
      <Button variant="outline-dark mt-4 p-1 "  onClick={showBrandModal}>Добавить бренд</Button>
      <Button variant="outline-dark mt-4 p-1" onClick={showDeviceModal}>Добавить девайс</Button>
      <CreateBrand {...brandProps} />
      <CreateType {...typeProps} />
      <CreateDevice {...deviceProps} />
    </Container>
  );
};
