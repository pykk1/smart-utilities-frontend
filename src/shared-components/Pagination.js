import React from 'react';
import './style/Pagination.css';

const Pagination = ({currentPage, paginate, startIndex, pageRange, itemsPerPage, items}) => {
    return (
        <div className="pagination">
            <button onClick={() => paginate(1)} disabled={currentPage === 1}>«</button>
            {Array.from({length: Math.ceil(items.length / itemsPerPage)}, (_, i) => i + 1)
                .slice(startIndex, startIndex + pageRange)
                .map((page, i, arr) => {
                    if (i === 0 && page !== 1) {
                        return <span key={`elipses-start`} className="elipses">...</span>;
                    }
                    if (i === pageRange - 1 && page !== arr[arr.length - 1]) {
                        return <span key={`elipses-end`} className="elipses">...</span>;
                    }
                    return (
                        <button key={page} onClick={() => paginate(page)}
                                className={`page-link ${currentPage === page ? 'active' : ''}`}>
                            {page}
                        </button>
                    );
                })}
            <button onClick={() => paginate(Math.ceil(items.length / itemsPerPage))}
                    disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>»
            </button>
        </div>
    );
};

export default Pagination;
