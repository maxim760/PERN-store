import { IDeviceWithCount } from "../../../services/api/deviceApi"

export type IInfoDevice = {
  id:number,
  title: string,
  description: string,
}

export interface IDevice  {
  id: number,
  name: string,
  price: number
  rating: number
  img: string,
  info?: IInfoDevice[]

} 

export type IDeviceState = {
  devices: IDeviceWithCount | null,
  selected: IDevice | null
}
