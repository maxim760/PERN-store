export type IBrand = {
  id: number,
  name: string
}
export type IBrandState = {
  brands: IBrand[],
  selected: IBrand | null
}