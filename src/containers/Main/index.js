import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './actions';
import NewsTable from './NewsTable';
import Chart from './Chart';

export default function () {
  const page = useSelector(state => state.main.page);
  const hitsPerPage = useSelector(state => state.main.hitsPerPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.search({ hitsPerPage, page }));
  }, [])

  return <div className="container p-0">
    <NewsTable />
    <Chart />
  </div>
}
