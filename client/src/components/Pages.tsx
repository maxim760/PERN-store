import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
import {
  selectTotalCount,
  selectLimit,
  selectPage,
} from "../store/ducks/pages/selector";
import { useAppDispatch } from "../store/store";
import { setPage } from "../store/ducks/pages/slice";

interface PagesProps {}

export const Pages: React.FC<PagesProps> = ({}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const countDevices = useSelector(selectTotalCount);
  const limit = useSelector(selectLimit);
  const activePage = useSelector(selectPage);
  const pageCount = Math.ceil(countDevices / limit);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const handleChangePage = (number: number) => () => {
    dispatch(setPage(number));
  };
  console.log(pages);
  return (
    <Pagination className="mt-3">
      {pages.map((page) => (
        <Pagination.Item
          active={activePage === page}
          key={page}
          onClick={handleChangePage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};
