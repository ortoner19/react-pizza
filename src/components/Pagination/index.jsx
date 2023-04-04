import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

 const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={event => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}  // 4 піцци
    pageCount={3}          // 3 сторінки
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}

export default Pagination;