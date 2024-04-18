/* eslint-disable import/extensions */
import React from 'react';
import { Button } from '@/shadcn_components/ui/button';

const DATA_PER_PAGE = 10;

export default function Pagination({
  currentPage,
  setCurrentPage,
  dataSize,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dataSize: number;
}) {
  const maxPages = Math.ceil(dataSize / DATA_PER_PAGE);
  const isLastPage = currentPage === maxPages;
  const isFirstPage = currentPage === 1;

  function handlePrevPage() {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => (prevPage < maxPages ? prevPage + 1 : prevPage));
  }

  const startResult = (currentPage - 1) * DATA_PER_PAGE + 1;
  const endResult = isLastPage
    ? Math.min(currentPage * DATA_PER_PAGE, dataSize)
    : currentPage * DATA_PER_PAGE;

  return (
    <div className="flex justify-between w-full mt-4">
      <h1 className="self-start text-sm text-foreground">
        {dataSize ? `Showing results from ${startResult} to ${endResult} of ${dataSize}` : null}
      </h1>

      <div className="mr-10 space-x-3 text-center">
        <Button
          variant="secondary"
          onClick={() => handlePrevPage()}
          className="text-xs rounded-3xl"
          disabled={isFirstPage}
        >
          {'<- Previous Page'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNextPage()}
          className="text-xs rounded-full bg-primary/70"
          disabled={isLastPage}
        >
          {'Next Page ->'}
        </Button>
      </div>
    </div>
  );
}
