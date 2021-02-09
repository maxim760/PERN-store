import React from "react";
import { IDevice } from "../store/ducks/device/types";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/Image";
import starImg from "../assets/star.png";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../utils/consts";

interface DeviceItemProps {
  device: IDevice;
}

export const DeviceItem: React.FC<DeviceItemProps> = ({
  device,
}): React.ReactElement => {
  const history = useHistory();
  const handleClick = () => history.push(ROUTES.DEVICE_ROUTE + "/" + device.id);
  return (
    <Col md={3} className="mt-3">
      <Card className="deviceCard" border="light" onClick={handleClick}>
        <Image style={{ width: 150, height: 150 }} src={process.env.REACT_APP_URL + device.img} />
        <div className=" text-black-50 d-flex justify-content-between mt-3">
          <div>samsug</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image
              className="d-block ml-2"
              height={18}
              width={18}
              src={starImg}
            />
          </div>
        </div>
        <div className="d-flex align-items-center">{device.name}</div>
      </Card>
    </Col>
  );
};
