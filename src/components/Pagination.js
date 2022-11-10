import { chakra } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

const ReactPaginateFlex = chakra(ReactPaginate);

const Pagination = ({ itemsPerPage, coins, offset, setOffset, endOffset }) => {
  console.log(`Loading items from ${offset} to ${endOffset}`);
  const pageCount = Math.ceil(coins.length / itemsPerPage);

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % coins.length;
    console.log(e.selected);
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  };

  return (
    <ReactPaginateFlex
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={10}
      pageCount={pageCount}
      previousLabel="⬅ Prev"
      nextLabel="Next ➡"
      renderOnZeroPageCount={null}
      listStyleType="none"
      display="flex"
      justifyContent="center"
      gap={6}
      pt={6}
      pb={12}
    />
  );
};
export default Pagination;
