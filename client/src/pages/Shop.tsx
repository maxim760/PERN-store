import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { TypeBar, BrandBar, DeviceList, Pages } from "../components";
import { TypeApi } from "../services/api/typeApi";
import { useAppDispatch } from "../store/store";
import { setTypes } from "../store/ducks/type/slice";
import { isErrorType } from "../services/api/userApi";
import { setBrands } from "../store/ducks/brand/slice";
import { BrandApi } from "../services/api/brandApi";
import { DeviceApi } from "../services/api/deviceApi";
import { setDevices } from "../store/ducks/device/slice";

interface ShopProps {}

export const Shop: React.FC<ShopProps> = ({}): React.ReactElement => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    async function getTypes() {
      const fetchTypes = await TypeApi.getAll();
      if (!isErrorType(fetchTypes)) {
        dispatch(setTypes(fetchTypes));
      }
    }
    getTypes();
  }, []);
  React.useEffect(() => {
    async function getBrands() {
      const fetchBrands = await BrandApi.getAll();
      if (!isErrorType(fetchBrands)) {
        dispatch(setBrands(fetchBrands));
      }
    }
    getBrands();
  }, []);


  return (
    <Container>
      <Row className="mt-2 mb-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};
