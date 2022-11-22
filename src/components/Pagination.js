import { chakra } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

const ReactPaginateFlex = chakra(ReactPaginate);

const Pagination = ({
  itemsPerPage,
  coins,
  offset,
  setOffset,
  endOffset,
  setPage,
}) => {
  // console.log(`Loading items from ${offset} to ${endOffset}`);
  const pageCount = Math.ceil(coins.length / itemsPerPage);

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % coins.length;
    setPage(e.selected + 1);
    window.scrollTo({ top: 495, left: 0, behavior: 'smooth' });
    // console.log(e.selected);
    // console.log(
    //   `User requested page number ${e.selected}, which is offset ${newOffset}`
    // );
    setOffset(newOffset);
  };

  return (
    <ReactPaginateFlex
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="⬅"
      nextLabel="➡"
      renderOnZeroPageCount={null}
      listStyleType="none"
      display="flex"
      justifyContent="center"
      gap={[0, null, 2]}
      my={14}
      color="yellow.400"
      fontSize={['xs', 'sm', null, 'md']}
    />
  );
};
export default Pagination;
