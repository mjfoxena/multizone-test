import React, { useEffect, useState } from "react";

interface ClassNames {
  tableClassName?: string;
  theadClassName?: string;
  styles?: React.CSSProperties;
  trHeadClassName?: string;
  thHeadClassName?: string;
  trBodyClassName?: string;
  thBodyClassName?: string;
}

interface Header {
  value: string;
  text: string;
  hidden?: boolean;
  className?: string;
}

interface TableProps {
  classNames: ClassNames;
  children?: any;
  headers: Array<Header>;
  items: Array<any>;
  isDark: boolean;
  onCurrentItemsChange: (items) => void;
}

const UIDataTable = ({
  classNames,
  children,
  headers,
  items,
  onCurrentItemsChange,
  isDark = false,
}: TableProps) => {
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState(items.slice(0, itemsPerPage));

  useEffect(() => {
    handlePageChange(1);
  }, []);

  const handlePageChange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPage(pageNumber);
    const currData = items.slice(startIndex, endIndex);

    onCurrentItemsChange(currData);
  };

  return (
    <>
      <table className={classNames.tableClassName}>
        <thead className={classNames.theadClassName} style={classNames.styles}>
          <tr className={classNames.trHeadClassName}>
            {headers.map(
              (head) =>
                !head.hidden && (
                  <th
                    key={head.value}
                    scope="col"
                    className={`${head.className} ${classNames.thHeadClassName}`}
                  >
                    {head.text}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {items.length >= itemsPerPage && (
        <Pagination
          totalItems={items}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          isDark={isDark}
        />
      )}
    </>
  );
};
const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  isDark,
}) => {
  const totalPages = Math.ceil(totalItems.length / itemsPerPage);

  const pages = Array.from(Array(totalPages).keys()).map((i) => i + 1);

  return (
    <div>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        {/* <span className="text-sm font-normal text-gray-500 ">
          Showing <span className="font-semibold text-gray-900 ">1-10</span> of{" "}
          <span className="font-semibold text-gray-900">
            {totalItems.length}
          </span>
        </span> */}
        <div></div>
        <ul className="inline-flex items-center -space-x-px">
          {/* Show Previous */}
          <li
            className={`${currentPage === 1 ? "cursor-not-allowed" : ""} ${
              isDark
                ? " border-gray-800 border hover:bg-gray-700"
                : " border-gray-300 border hover:bg-gray-100 hover:text-gray-300 "
            }  block px-3 py-1 ml-0 leading-tight text-gray-500 rounded-l-lg
            `}
            onClick={() => {
              console.log(currentPage);

              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>

          {/* Show Numbers */}
          {pages.map((page) => (
            <li
              key={page}
              onClick={(e) => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
              className={`${
                page == currentPage
                  ? "text-gray-900 cursor-not-allowed "
                  : "text-gray-600 cursor-pointer"
              } ${
                isDark
                  ? " border-gray-800 border text-gray-300 hover:bg-gray-700"
                  : "  border-gray-300 border hover:bg-gray-100"
              }  px-3 py-1 leading-tight
                 `}
            >
              <span>{page}</span>
            </li>
          ))}

          {/* Show Next */}
          <li
            onClick={() => {
              if (currentPage !== pages.length) {
                onPageChange(currentPage + 1);
              }
            }}
            className={`${
              isDark
                ? " border-gray-800 border hover:bg-gray-700"
                : "bg-white  border-gray-300 border hover:bg-gray-100 hover:text-gray-300 "
            } block px-3 py-1 leading-tight text-gray-500   rounded-r-lg  `}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UIDataTable;
