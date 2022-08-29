import {
  useTable,
  useBlockLayout,
  usePagination,
  useRowSelect,
  useFlexLayout,
  useResizeColumns,
} from 'react-table';
import { useEffect, useMemo, useState } from 'react';
import { useSticky } from 'react-table-sticky';
import { useDispatch } from 'react-redux';
import { Card } from 'reactstrap';

import { fetchRequest } from '../helpers/fetcher.helper';

import TableHeader from './components/TableHeader';
import Paginator from './components/Paginator';
import TableBody from './components/TableBody';

import './index.scss';
import { noDataIndicationRender } from '../helpers/render.helper';
import { DEFAULT_COLUMN } from './constants';

const defaultSizePerPage = 100;

const ReactStickyTable = ({
  tableId,
  data,
  columns,
  fetchData,
  fetchForColumnHeader,
  tableFilters,
  totalCount,
  loading,
  defaultColumnProps,
  children: filterChildren,
  url,
}) => {
  const dispatch = useDispatch();
  const sizePerPageList = [100, 50, 10];
  const [controlledPageCount, setControlledPageCount] = useState(0);

  const defaultColumn = useMemo(
    () => ({
      minWidth: defaultColumnProps?.minWidth || DEFAULT_COLUMN.minWidth,
      width: defaultColumnProps?.width || DEFAULT_COLUMN.width,
      maxWidth: defaultColumnProps?.maxWidth || DEFAULT_COLUMN.maxWidth,
    }),
    [defaultColumnProps],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    canPreviousPage,
    canNextPage,

    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      autoResetPage: false,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: defaultSizePerPage,
        loading: loading,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useBlockLayout,
    useSticky,
    useResizeColumns,
    usePagination,
    useRowSelect,

    useFlexLayout,
  );

  useEffect(() => {
    setControlledPageCount(Math.ceil(totalCount / pageSize));
  }, [pageSize, totalCount]);

  useEffect(() => {
    fetchRequest({
      dispatch,
      fetchData,
      pageIndex,
      pageSize,
      tableFilters,
      fetchForColumnHeader,
      take: pageSize,
      skip: pageIndex * pageSize,
      url,
    });
  }, [
    dispatch,
    fetchData,
    pageIndex,
    pageSize,
    tableFilters,
    fetchForColumnHeader,
    url,
  ]);

  const headerProps = (props, { column }) => getStyles(props, column.align);

  const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

  const getStyles = (props, align = 'left') => [
    props,
    {
      style: {
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      },
    },
  ];

  return (
    <Card id={tableId} className="table-card">
      <div className="mb-2 сolumnHeader">
        <div className="table-helpers-container">
          {filterChildren}
          <div className="footer-container">
            <Paginator
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              nextPage={nextPage}
              previousPage={previousPage}
              setPageSize={setPageSize}
              pageSize={pageSize}
              sizePerPageList={sizePerPageList}
              pageIndex={pageIndex}
            />
          </div>
        </div>
      </div>
      <div {...getTableProps()} className="table sticky">
        <TableHeader
          headerGroups={headerGroups}
          getTableProps={getTableProps}
          headerProps={headerProps}
        />

        {noDataIndicationRender({ loading, isStickyTable: true, data })}

        <TableBody
          prepareRow={prepareRow}
          rows={rows}
          getTableBodyProps={getTableBodyProps}
          cellProps={cellProps}
        />
      </div>
    </Card>
  );
};

export default ReactStickyTable;
