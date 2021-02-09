import React from "react";
import { useSelector } from "react-redux";
import { selectDevices } from "../store/ducks/device/selector";
import Row from "react-bootstrap/esm/Row";
import { DeviceItem } from "./DeviceItem";
import { BrandApi } from "../services/api/brandApi";
import { isErrorType } from "../services/api/userApi";
import { setBrands } from "../store/ducks/brand/slice";
import { useAppDispatch } from "../store/store";
import { IAuthError } from "../store/ducks/user/types";
import { ErrorAlert } from "./ErrorAlert";
import { Loader } from "./Loader";
import { setDevices } from "../store/ducks/device/slice";
import { DeviceApi } from "../services/api/deviceApi";
import { setTotalCount } from "../store/ducks/pages/slice";
import { selectTypeSelected } from "../store/ducks/type/selector";
import { selectLimit, selectPage } from "../store/ducks/pages/selector";
import { selectBrandSelected } from "../store/ducks/brand/selector";

export const DeviceList: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState<IAuthError>(null);
  const typeId = useSelector(selectTypeSelected)?.id;
  const brandId = useSelector(selectBrandSelected)?.id;
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  React.useEffect(() => {
    async function getDevice() {
      const fetchDevices = await DeviceApi.getAll({
        typeId,
        brandId,
        page,
        limit,
      });
      if (!isErrorType(fetchDevices)) {
        dispatch(setDevices(fetchDevices));
        dispatch(setTotalCount(fetchDevices.count));
      } else {
        setError(fetchDevices.error);
      }
    }
    getDevice();
  }, [page, typeId, brandId, limit]);
  const devices = useSelector(selectDevices);
  if (error) {
    return <ErrorAlert error={error} />;
  }
  if (!devices) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <Loader />
      </div>
    );
  }
  return (
    <Row className="d-flex">
      {devices.length ? (
        devices.map((device) => <DeviceItem key={device.id} device={device} />)
      ) : (
        <h2>Девайсов по вашим параметрам не найдено</h2>
      )}
    </Row>
  );
};
