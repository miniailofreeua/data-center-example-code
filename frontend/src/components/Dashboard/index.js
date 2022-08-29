import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MiniWidgetChart from '../Charts/MiniWidgetChart';
import CircleBar from '../Charts/CircleBarChart';
import BarChart from '../Charts/BarChart';

import TopTenList from './components/TopTenList';
import ChartContainer from './components/ChartContainer';

const Dashboard = ({
  miniWidgetDataToRender,
  circleBarDataToRender,
  circleBarContainerTitle,
  topTenTableContainerTitle,
  topTenTableDataToRender,
  topTenTableBarChartTitle,
  url,
  topCardFetchUrl,
  fetchData,
  fetchDataForTopCard,
  topCardFilters,
  filters,
  loading,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchData) {
      dispatch(
        fetchData(
          Object.assign(
            {
              ...(url && { url }),
            },
            filters,
          ),
        ),
      );
    }
  }, [fetchData, filters, url, dispatch]);

  useEffect(() => {
    if (fetchDataForTopCard) {
      dispatch(
        fetchDataForTopCard(
          Object.assign(
            {
              ...(topCardFetchUrl && { url: topCardFetchUrl }),
            },
            topCardFilters,
          ),
        ),
      );
    }
  }, [fetchDataForTopCard, topCardFilters, topCardFetchUrl, dispatch]);

  return (
    <>
      <MiniWidgetChart data={miniWidgetDataToRender} loading={loading} />

      <ChartContainer title={circleBarContainerTitle}>
        {circleBarDataToRender?.map((options) => (
          <CircleBar data={options} loading={loading} />
        ))}
      </ChartContainer>
      <ChartContainer title={topTenTableContainerTitle}>
        <>
          <TopTenList data={topTenTableDataToRender[0]} loading={loading} />
          <BarChart
            data={topTenTableDataToRender[1]}
            topTenTableBarChartTitle={topTenTableBarChartTitle}
            loading={loading}
          />
        </>
      </ChartContainer>
    </>
  );
};

export default React.memo(Dashboard);
