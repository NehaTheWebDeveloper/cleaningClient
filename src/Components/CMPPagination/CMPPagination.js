import React from 'react';

const CMPPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    return pages.map((page) => (
      <a
        key={page}
        href="#!"
        className={`${
          page === currentPage
            ? 'bg-primary-100 text-primary-700'
            : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
        } relative block rounded px-3 py-1.5 text-sm transition-all duration-300`}
        onClick={() => handlePageClick(page)}
      >
        {page}
      </a>
    ));
  };

  return (
    <div className="flex justify-end">
      <nav aria-label="Page navigation">
        <ul className="list-style-none flex">
          <li>
            <a
              href="#!"
              className={`${
                currentPage === 1
                  ? 'pointer-events-none'
                  : 'hover:bg-neutral-100'
              } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300`}
              onClick={() => handlePageClick(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {renderPagination()}
          <li>
            <a
              href="#!"
              className={`${
                currentPage === totalPages
                  ? 'pointer-events-none'
                  : 'hover:bg-neutral-100'
              } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300`}
              onClick={() => handlePageClick(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CMPPagination;
