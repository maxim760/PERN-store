export type IType = {
  id: number,
  name: string
}
export type ITypeState = {
  types: IType[],
  selected: IType | null
}
