import { RootState } from "../../RootReducer";

export const selectDevices = (state: RootState) => state.device.devices?.rows || null
export const selectDevicesCount = (state: RootState) => state.device.devices?.count || 0
export const selectDevicesSelected = (state: RootState) => state.device.selected