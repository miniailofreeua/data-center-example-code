import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import paginationFactory, {
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import classNames from 'classnames';

import { fetchRequest } from '../helpers/fetcher.helper';
import {
  noDataIndicationRender,
  renderActions,
  renderStats,
} from '../helpers/render.helper';

import { expanderCell } from './components/ExpanderCell';

import styles from '../styles.module.scss';
import './lineStyles.scss';

const defaultSizePerPage = 100;

const ReactTable = ({
  tableId,
  data,
  columns,
  fetchData,
  fetchForColumnHeader,
  tableFilters,
  totalCount,
  loading,
  statsToRender,
  children: filterChildren,
  showPagination = true,
  actions,
  url,
  showExpandColumn,
  expandRowRenderer,
  isExpandedTable,
  isSelectableRow,
  isStickyHeader,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const [sizePerPage, setSizePerPage] = useState(defaultSizePerPage);
  const onSizePerPageChange = (size) => {
    setSizePerPage(size);
  };

  const pageOptions = {
    totalSize: totalCount,
    custom: true,
    hideSizePerPage: data.length === 0,
    sizePerPage,
    onSizePerPageChange,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
    ],
  };
  useEffect(() => {
    fetchRequest({
      dispatch,
      fetchData,
      take: pageOptions.sizePerPage,
      skip:
        currentPage === 0
          ? currentPage * pageOptions.sizePerPage
          : (currentPage - 1) * pageOptions.sizePerPage,
      currentPage,
      tableFilters,
      fetchForColumnHeader,
      url,
    });
  }, [
    dispatch,
    fetchData,
    pageOptions.sizePerPage,
    currentPage,
    tableFilters,
    fetchForColumnHeader,
    url,
  ]);

  const handleTableChange = (_type, { page }) => {
    setCurrentPage(page);
  };

  const expandRow = useMemo(
    () => ({
      showExpandColumn,
      renderer: expandRowRenderer,
      expandColumnRenderer: expanderCell,
      expandHeaderColumnRenderer: expanderCell,
    }),
    [expandRowRenderer, showExpandColumn],
  );

  const selectRow = {
    mode: 'checkbox',
    style: {
      background: 'rgb(52 136 195 / 16%)',
      transition: 'all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
      borderRadius: '5px',
    },
  };

  const stickyHeader = {
    ...(isStickyHeader && {
      headerWrapperClasses: 'sticky-header-class-header-wrapper',
      bodyClasses: 'sticky-header-class-body',
      wrapperClasses: 'sticky-header-class-wrapper',
      rowClasses: 'sticky-header-class-row',
      headerClasses: 'sticky-header-class-header',
    }),
  };

  return (
    <Card id={tableId} className={isExpandedTable && styles.expandedCard}>
      <CardBody className={isExpandedTable && styles.expandedCardBody}>
        <PaginationProvider pagination={paginationFactory(pageOptions)}>
          {({ paginationProps, paginationTableProps }) => (
            <ToolkitProvider
              keyField="id"
              data={data || []}
              columns={columns}
              bootstrap4
              search
            >
              {(toolkitProps) => (
                <React.Fragment>
                  {!isExpandedTable && (
                    <div
                      className={classNames('mb-2', styles.saleColumnHeader)}
                    >
                      {filterChildren}
                      {renderActions({ actions })}
                      {renderStats({ stats: statsToRender })}
                    </div>
                  )}

                  <Row>
                    <Col xl="12">
                      <div
                        className={classNames(
                          'table-responsive',
                          !isExpandedTable && 'mb-4',
                        )}
                      >
                        <BootstrapTable
                          expandRow={expandRow}
                          {...stickyHeader}
                          selectRow={isSelectableRow && selectRow}
                          table
                          responsive
                          remote
                          hover
                          bordered={false}
                          striped={false}
                          classes={
                            ('table table-centered table-nowrap mb-0',
                            isStickyHeader && 'sticky-header-class-table')
                          }
                          onTableChange={handleTableChange}
                          noDataIndication={noDataIndicationRender({ loading })}
                          {...toolkitProps.baseProps}
                          {...paginationTableProps}
                        />
                      </div>
                    </Col>
                  </Row>
                  {showPagination && (
                    <div className="float-sm-end d-flex">
                      <PaginationListStandalone {...paginationProps} />
                      <SizePerPageDropdownStandalone
                        variation={'dropup'}
                        {...paginationProps}
                        className="ms-3"
                      />
                    </div>
                  )}
                </React.Fragment>
              )}
            </ToolkitProvider>
          )}
        </PaginationProvider>
      </CardBody>
    </Card>
  );
};

export default ReactTable;
