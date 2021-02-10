import {
  brandReducer,
  addBrand,
  setBrands,
  removeBrand,
  updateBrand,
  setSelectedBrand,
  resetSelectedBrand,
} from "./slice";
import { IBrandState } from "./types";

const fakeState: IBrandState = {
  brands: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ],
  selected: null,
};

const fakeBrand = { id: 4, name: "4" };

describe("brand slice", () => {
  it("addBrand", () => {
    expect(brandReducer(fakeState, addBrand(fakeBrand))).toEqual({
      ...fakeState,
      brands: [...fakeState.brands, fakeBrand],
    });
  });
  it("setBrands", () => {
    expect(
      brandReducer({ ...fakeState, brands: [] }, setBrands([fakeBrand]))
    ).toEqual({
      ...fakeState,
      brands: [fakeBrand],
    });
  });
  it("removeBrand", () => {
    expect(brandReducer(fakeState, removeBrand(1))).toEqual({
      ...fakeState,
      brands: [
        { id: 2, name: "2" },
        { id: 3, name: "3" },
      ],
    });
  });
  it("removeBrand if id not finded", () => {
    expect(brandReducer(fakeState, removeBrand(5))).toEqual(fakeState);
  });
  it("updateBrand", () => {
    expect(brandReducer(fakeState, updateBrand({ id: 1, name: "name" }))).toEqual(
      {
        ...fakeState,
        brands: [
          { id: 1, name: "name" },
          { id: 2, name: "2" },
          { id: 3, name: "3" },
        ],
      }
    );
  });
  it("updateBrand if not find id", () => {
    expect(brandReducer(fakeState, updateBrand({ id: 100, name: "name" }))).toEqual(fakeState);
  });
  it("setSelectedBrand", () => {
    expect(
      brandReducer(fakeState, setSelectedBrand({ id: 1, name: "1" }))
    ).toEqual({
      ...fakeState,
      selected: { id: 1, name: "1" },
    });
  });
  it("resetSelectedBrand", () => {
    expect(
      brandReducer(
        { ...fakeState, selected: { id: 1, name: "1" } },
        resetSelectedBrand
      )
    ).toEqual({
      ...fakeState,
      selected: null,
    });
  });
});
