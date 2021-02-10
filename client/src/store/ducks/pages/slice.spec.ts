import { setLimit, setPage, setTotalCount, pageReducer } from "./slice";
import { IPageState } from "./types";
import { initialState } from "./slice";



describe("page slice", () => {
  it("setPage", () => {
    expect(pageReducer(initialState, setPage(100))).toEqual({
      ...initialState,
      page: 100
    });
  });
  it("setLimit", () => {
    expect(pageReducer(initialState, setLimit(100))).toEqual({
      ...initialState,
      limit: 100
    });
  });
  it("setTotalCount", () => {
    expect(pageReducer(initialState, setTotalCount(100))).toEqual({
      ...initialState,
      totalCount: 100
    });
  });
});
