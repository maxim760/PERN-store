import React from "react";
import {
  selectBrands,
  selectBrandSelected,
} from "../store/ducks/brand/selector";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/consts";
import { useAppDispatch } from "../store/store";
import {
  setSelectedBrand,
  resetSelectedBrand,
} from "../store/ducks/brand/slice";
import { IBrand } from "../store/ducks/brand/types";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";

export const BrandBar: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const brands = useSelector(selectBrands);
  const handleSelectedBrand = (brand: IBrand) => () =>
    dispatch(setSelectedBrand(brand));
  const handleResetBrand = () => dispatch(resetSelectedBrand());
  const selectedBrand = useSelector(selectBrandSelected);

  return (
    <Row className="d-flex flex-wrap">
      <Card
        onClick={handleResetBrand}
        className="brandBarItem p-3"
        border={!selectedBrand ? "danger" : "light"}
      >
        Все
      </Card>
      {brands.map((brand) => (
        <Card
          key={brand.id}
          onClick={handleSelectedBrand(brand)}
          className="brandBarItem p-3"
          border={selectedBrand?.id === brand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
};
