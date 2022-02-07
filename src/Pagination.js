import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Pagination = ({
    startingPage,
    data,
    pageSize,
    setStartingPage,
    children
}) => {

  const [currentPage, setCurrentPage] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  useEffect(() => {
    const startPage = startingPage ? startingPage : 1;
    let pageCountUpdate = parseInt(data.length / pageSize);
    if (data.length % pageSize > 0) {
      pageCountUpdate++;
    }
    setCurrentPage(startPage);
    setPageCount(pageCountUpdate);
  }, [data, pageSize, startingPage])
  const setCurrentPageHandler = (num) => {
    setCurrentPage( num );
    setStartingPage( num );
  }

  const createControls = () => {
    let controls = [];
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = "pagination-controls__button";
      const activeClassName =
        i === currentPage ? `${baseClassName}--active` : "";
      controls.push(
        <div
          className={`${baseClassName} ${activeClassName}`}
          onClick={() => setCurrentPageHandler(i)}
        >
          {i}
        </div>
      );
    }
    return controls;
  }

  const createPaginatedData = () => {
    const upperLimit = currentPage * pageSize;
    const dataSlice = data.slice(upperLimit - pageSize, upperLimit);
    return dataSlice;
  }

    return (
      <div className="pagination">
        <div className="pagination-results">
          {React.cloneElement(children, {
            data: createPaginatedData(),
          })}
        </div>
        <div className="pagination-controls">{createControls()}</div>
      </div>
    );
}

Pagination.propTypes = {
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  startingPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  pageSize: 4,
  startingPage: 1,
};

export default Pagination;
