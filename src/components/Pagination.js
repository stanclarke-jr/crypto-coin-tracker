/* eslint-disable react-hooks/exhaustive-deps */
import { chakra } from '@chakra-ui/react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const ReactPaginateFlex = chakra(ReactPaginate);

const Pagination = ({
  itemsPerPage,
  coins,
  offset,
  setOffset,
  endOffset,
  setPage,
  search,
  isSearch,
  handleSearch,
  page,
}) => {
  // console.log(`Loading items from ${offset} to ${endOffset}`);

  const pageCount = Math.ceil(handleSearch().length / itemsPerPage);
  useEffect(() => {
    if (isSearch) {
      setPage(currPage => {
        return { ...currPage, search: 0 };
      });
      setOffset(currOffset => {
        return { ...currOffset, search: 0 };
      });
    }
  }, [search]);

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % coins.length;
    setPage(currPage =>
      isSearch
        ? { ...currPage, search: e.selected }
        : { ...currPage, default: e.selected }
    );
    window.scrollTo({ top: 495, left: 0, behavior: 'smooth' });

    setOffset(currOffset =>
      isSearch
        ? { ...currOffset, search: newOffset }
        : { ...currOffset, default: newOffset }
    );
  };

  return (
    <ReactPaginateFlex
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={isSearch ? page.search : page.default}
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
