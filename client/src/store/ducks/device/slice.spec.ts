import {
  deviceReducer,
  addDevice,
  setDevices,
  removeDevice,
  updateDevice,
  setSelectedDevice,
  resetSelectedDevice,
} from "./slice";
import { IDeviceState } from "./types";

const fakeState = {
  devices: {
    count: 3,
    rows: [
      { id: 1, name: "1", price: 1, rating: 4, img: "url" },
      { id: 2, name: "2", price: 1, rating: 4, img: "url" },
      { id: 3, name: "3", price: 1, rating: 4, img: "url" },
    ],
  },
  selected: null,
};

const deviceForUpdate = { id: 2, price: 999, img:"updated", random:"nono" }; // ключ рандом не должен ничего изменить

const fakeDevice = { id: 4, name: "4", price: 1, rating: 4, img: "url" };

describe("device slice", () => {
  it("addDevice", () => {
    expect(deviceReducer(fakeState, addDevice(fakeDevice))).toEqual({
      ...fakeState,

      devices: {
        count: fakeState.devices.count + 1,
        rows: [...fakeState.devices.rows, fakeDevice],
      },
    });
  });
  it("addDevice if now devices is empty", () => {
    expect(deviceReducer({...fakeState, devices: null}, addDevice(fakeDevice))).toEqual({
      ...fakeState,

      devices: {
        count:  1,
        rows: [fakeDevice],
      },
    });
  });
  //TODO: затестить апи типа щопросы отс ервера тоже прекольна!!!
  it("setDevices", () => {
    expect(
      deviceReducer(
        { ...fakeState, devices: { rows: [], count: 0 } },
        setDevices(fakeState.devices)
      )
    ).toEqual(fakeState);
  });
  it("removeDevice", () => {
    expect(deviceReducer(fakeState, removeDevice(1))).toEqual({
      ...fakeState,
      devices: {
        count: 2,
        rows: [
          { id: 2, name: "2", price: 1, rating: 4, img: "url" },
          { id: 3, name: "3", price: 1, rating: 4, img: "url" },
        ],
      },
    });
  });
  it("removeDevice if id not finded", () => {
    expect(deviceReducer(fakeState, removeDevice(5))).toEqual(fakeState);
  });
  it("updateDevice", () => {
    expect(deviceReducer(fakeState, updateDevice(deviceForUpdate))).toEqual({
      ...fakeState,
      devices: {
        count: 3,
        rows: [
          { id: 1, name: "1", price: 1, rating: 4, img: "url" },
          { id: 2, name: "2", price: 999, rating: 4, img: "updated" },
          { id: 3, name: "3", price: 1, rating: 4, img: "url" },
        ],
      },
    });
  });
  it("updateDevice if not find id", () => {
    expect(deviceReducer(fakeState, updateDevice({...deviceForUpdate, id:100}))).toEqual(fakeState);
  });
  it("setSelectedDevice", () => {
    expect(
      deviceReducer(fakeState, setSelectedDevice(fakeState.devices.rows[0]))
    ).toEqual({
      ...fakeState,
      selected: fakeState.devices.rows[0],
    });
  });
  it("resetSelectedDevice", () => {
    expect(
      deviceReducer(
        { ...fakeState, selected: fakeState.devices.rows[0] },
        resetSelectedDevice
      )
    ).toEqual({
      ...fakeState,
      selected: null,
    });
  });
});
