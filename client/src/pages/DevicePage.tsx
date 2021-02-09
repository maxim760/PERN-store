import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/esm/Row";
import bigstar from "../assets/bigstar.png";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import { DeviceApi } from "../services/api/deviceApi";
import { isErrorType } from "../services/api/userApi";
import { IDevice } from "../store/ducks/device/types";
import { IAuthError } from "../store/ducks/user/types";
import { Loader, ErrorAlert } from "../components";
interface DevicePageProps {}
type IParams = { id: string };
export const DevicePage: React.FC<DevicePageProps> = ({}): React.ReactElement => {
  const params = useParams<IParams>();
  const [device, setDevice] = React.useState<null | IDevice>(null);
  const [error, setError] = React.useState<IAuthError>(null);
  React.useEffect(() => {
    const getDevice = async () => {
      const device = await DeviceApi.getOne(+params.id); // if NaN => error => alert
      if (!isErrorType(device)) {
        setDevice(device);
        console.log(device)
      } else {
        setError(device.error);
      }
    };
    getDevice();
  }, []);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!device) {
    return (
      <div className="d-flex w-100 mt-5 align-items-center justify-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            src={process.env.REACT_APP_URL + device.img}
            width={300}
            height={300}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center mt-3"
              style={{
                background: `url(${bigstar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-content-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              padding: 10,
              border: "5px solid lightgray",
            }}
          >
            <h3 className="m-auto">От: {device.price} р.</h3>
            <Button
              className="m-auto"
              variant="outline-dark"
              onClick={() =>
                alert("создать слайс корзины и реализовать добпвление!")
              }
            >
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3 ">
        {device.info && (
          <>
            <h2 className="mb-3">Характеристики</h2>
            {device.info.map((item, index) => (
              <Row
                key={item.id}
                style={{
                  background: index % 2 ? "transparent" : "lightgray",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                {item.title}: {item.description}
              </Row>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};
