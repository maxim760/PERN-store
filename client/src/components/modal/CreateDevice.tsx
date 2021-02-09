import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { selectTypes } from "../../store/ducks/type/selector";
import { useSelector } from "react-redux";
import { selectBrands } from "../../store/ducks/brand/selector";
import { IInfoDevice } from "../../store/ducks/device/types";
import remove from "../../assets/delete.svg";
import { useChange } from "../../hooks/useChange";
import { BrandApi } from "../../services/api/brandApi";
import { isErrorType } from "../../services/api/userApi";
import { setBrands } from "../../store/ducks/brand/slice";
import { useAppDispatch } from "../../store/store";
import { TypeApi } from "../../services/api/typeApi";
import { setTypes } from "../../store/ducks/type/slice";
import { DeviceApi } from "../../services/api/deviceApi";

interface CreateDeviceProps {
  show: boolean;
  onHide(): void;
}
type ISelected = {
  id: number;
  name: string;
};

type IChangedInfo = {
  id: number;
  key: keyof Omit<IInfoDevice, "id">;
  value: string;
};

export const CreateDevice: React.FC<CreateDeviceProps> = ({
  show,
  onHide,
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {

    Promise.all([BrandApi.getAll(), TypeApi.getAll()]).then((res) => {
      if (!isErrorType(res[0])) {
        dispatch(setBrands(res[0]));
      }
      if (!isErrorType(res[1])) {
        dispatch(setTypes(res[1]));
      }
    });
  }, []);
  const brands = useSelector(selectBrands);
  const types = useSelector(selectTypes);
  const [name, handleChangeName] = useChange();
  const [price, handleChangePrice] = useChange();
  const [selectedType, setSelectedType] = React.useState<null | ISelected>(
    null
  );
  const [selectedBrand, setSelectedBrand] = React.useState<null | ISelected>(
    null
  );
  const [image, setImage] = React.useState<null | string>(null);
  const [file, setFile] = React.useState<null | File>(null);
  const [info, setInfo] = React.useState<IInfoDevice[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBrand?.id) {
      alert("Не указан брэнд устройства")
      return
    }
    if (!selectedType?.id) {
      alert("Не указан тип устройства")
      return
    }
    const formData = new FormData(e.currentTarget)
    formData.append("brandId", `${selectedBrand!.id}`)
    formData.append("typeId", `${selectedType!.id}`)
    formData.append("info", JSON.stringify(info))
    console.log(info)
    DeviceApi.create(formData).then((data) => {
      if (!isErrorType(data)) {
        onHide()
        alert("Девайс успешно добавлен")
      } else {
        alert(data.error.message)
      }
    })
  };
  const handleSelectType = (type: ISelected) => () => setSelectedType(type);
  const handleSelectBrand = (brand: ISelected) => () => setSelectedBrand(brand);
  const onRemoveCharact = (id: number) => () => {
    setInfo((prev) => {
      const changed = prev.filter((info) => info.id !== id);
      return changed;
    });
  };
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = (e?.target?.result || null) as string | null;
      setImage(src);
    };
    if (file) {
      setFile(file);
      reader.readAsDataURL(file);
    }
    // получаю файл
    // если файл есть делаю функцию
    // во время функции срабатывает обработчик он лоад и реализует свой функционал
  };

  const handleAddInfo = () => {
    setInfo((prev) => {
      const changed = [...prev, { title: "", description: "", id: Date.now() }];
      return changed;
    });
  };
  const handleChangeInfo = ({ key, value, id }: IChangedInfo) => {
    setInfo(info.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
    console.log(key,value,id)
    console.log(info)
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить девайс</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown >
            <Dropdown.Toggle>
              {selectedType?.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type) => (
                <Dropdown.Item onClick={handleSelectType(type)} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-3">
            <Dropdown.Toggle name="brand">
              {selectedBrand?.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand) => (
                <Dropdown.Item
                  onClick={handleSelectBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            name="name"
            value={name}
            required
            onChange={handleChangeName}
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            name="price"
            value={price}
            required
            onChange={handleChangePrice}
            className="mt-3"
            type="number"
            placeholder="Введите цену"
          />
          <Form.Control
            className="mt-3"
            required
            name="img"
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
          />
          {image && (
            <Image
              src={image}
              width="100%"
              height="auto"
              style={{
                maxWidth: "100%",
                maxHeight: "100px",
                objectFit: "contain",
              }}
            />
          )}
          <hr />
          {info.map(({ id, title, description }) => (
            <Row key={id} className="mb-3 d-flex align-items-center">
              <Col md={5}>
                <Form.Control
                  onChange={e => handleChangeInfo({
                    id,
                    value: e.target.value,
                    key: "title",
                  })}
                  value={title}
                  placeholder="Укажите название характеристики"
                />
              </Col>
              <Col md={5}>
                <Form.Control
                  onChange={e => handleChangeInfo({
                    id,
                    value: e.target.value,
                    key: "description",
                  })}
                  value={description}
                  placeholder="Укажите значение"
                />
              </Col>
              <Col md={2} onClick={onRemoveCharact(id)}>
                <Button
                  variant="outline-danger"
                  className="d-flex justify-content-center align-content-center"
                >
                  <Image src={remove} width={20} height={20} />
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="outline-dark" onClick={handleAddInfo}>
            Добавить новую характеристику
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" type="submit" disabled={!selectedType || !selectedBrand}>
            Добавить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
