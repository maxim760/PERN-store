import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeviceState, IDevice } from "./types";
import { IDeviceWithCount } from "../../../services/api/deviceApi";


const initialState: IDeviceState = {
  devices: null,
  selected: null
}

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    addDevice(state, action: PayloadAction<IDevice>) {
      if (!state.devices) {
        state.devices = {
          count: 0,
          rows: []
        }
      }
      state.devices.rows.push(action.payload);
      state.devices.count++
    },
    setDevices(state, action: PayloadAction<IDeviceWithCount>) {
      state.devices = action.payload
    },
    removeDevice(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state?.devices?.rows?.findIndex((device) => device.id === id);
      if (index !== undefined && index > -1 && state?.devices) {
        state.devices.rows.splice(index, 1);
        state.devices.count -= 1;
      } 

    },
    updateDevice(
      state,
      action: PayloadAction<Partial<IDevice> & { id: number }>
    ) {
      const { id, ...params } = action.payload;
      const device = state?.devices?.rows?.find((device) => device.id === id);
      if (device) {
        Object.entries(params).forEach(([key, value]) => {
          if (key in device) {
            console.log(key)
            console.log(device)
            //@ts-ignore
            device[key] = value
          }
        });
      }
    },
    setSelectedDevice(state, action: PayloadAction<IDevice>) {
      const device = action.payload
      state.selected = device
    },
    resetSelectedDevice(state, action: PayloadAction<void>) {
      state.selected = null
    }
  },
});

export const { addDevice, removeDevice, updateDevice, setSelectedDevice, resetSelectedDevice, setDevices } = deviceSlice.actions;

export const deviceReducer = deviceSlice.reducer;
