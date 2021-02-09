import React from "react";
import { selectTypes, selectTypeSelected } from "../store/ducks/type/selector";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/consts";
import { useAppDispatch } from "../store/store";
import { setSelectedType, resetSelectedType } from "../store/ducks/type/slice";
import { IType } from "../store/ducks/type/types";

export const TypeBar: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const types = useSelector(selectTypes);
  const handleSelectedType = (type: IType) => () =>
    dispatch(setSelectedType(type));
  const handleResetType = () => dispatch(resetSelectedType());
  const selectedType = useSelector(selectTypeSelected);

  return (
    <ListGroup>
      <ListGroup.Item
      className="typeBarItem"
      active={!selectedType}
      onClick={handleResetType}
      >
        Все
      </ListGroup.Item>
      {types.map((type) => (
        <ListGroup.Item
          className="typeBarItem"
          active={selectedType?.id === type.id}
          key={type.id}
          onClick={handleSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
