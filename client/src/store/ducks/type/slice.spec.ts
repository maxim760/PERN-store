import {
  typeReducer,
  addType,
  setTypes,
  removeType,
  updateType,
  setSelectedType,
  resetSelectedType,
} from "./slice";
import { initialState } from "./slice";
import { ITypeState } from "./types";

const fakeState: ITypeState = {
  types: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ],
  selected: null,
};

const fakeType = { id: 4, name: "4" };

describe("type slice", () => {
  it("addType", () => {
    expect(typeReducer(fakeState, addType(fakeType))).toEqual({
      ...fakeState,
      types: [...fakeState.types, fakeType],
    });
  });
  it("setTypes", () => {
    expect(
      typeReducer({ ...fakeState, types: [] }, setTypes([fakeType]))
    ).toEqual({
      ...fakeState,
      types: [fakeType],
    });
  });
  it("removeType", () => {
    expect(typeReducer(fakeState, removeType(1))).toEqual({
      ...fakeState,
      types: [
        { id: 2, name: "2" },
        { id: 3, name: "3" },
      ],
    });
  });
  it("removeType if id not finded", () => {
    expect(typeReducer(fakeState, removeType(5))).toEqual(fakeState);
  });
  it("updateType", () => {
    expect(typeReducer(fakeState, updateType({ id: 1, name: "name" }))).toEqual(
      {
        ...fakeState,
        types: [
          { id: 1, name: "name" },
          { id: 2, name: "2" },
          { id: 3, name: "3" },
        ],
      }
    );
  });
  it("updateType if not find id", () => {
    expect(typeReducer(fakeState, updateType({ id: 100, name: "name" }))).toEqual(fakeState);
  });

  it("setSelectedType", () => {
    expect(
      typeReducer(fakeState, setSelectedType({ id: 1, name: "1" }))
    ).toEqual({
      ...fakeState,
      selected: { id: 1, name: "1" },
    });
  });
  it("resetSelectedType", () => {
    expect(
      typeReducer(
        { ...fakeState, selected: { id: 1, name: "1" } },
        resetSelectedType
      )
    ).toEqual({
      ...fakeState,
      selected: null,
    });
  });
});
